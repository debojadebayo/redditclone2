"use client";

import React, { useState } from "react"; 
import { useSession } from "next-auth/react";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { Form, useForm } from "react-hook-form";
import { useMutation, useQuery, useSuspenseQuery } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../../../graphql/mutations";
import { GET_SUBREDDIT_BY_TOPIC } from "../../../graphql/queries";
import toast from "react-hot-toast";


type Props = {
    subreddit?: string
}

type FormData = {
    "postTitle": string,
    "postBody": string,
    "postSubreddit": string,
    "postImage": string
}

function PostBox({ subreddit }: Props) {

    const { data: session } = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState(false);
    const { register, handleSubmit, watch, setValue, formState: {errors} } = useForm<FormData>();
    
    const [addPost, { data, loading, error }] = useMutation(ADD_POST)
    const [addSubreddit, { data:addSubredditData, loading:addSubredditLoading, error:addSubredditError }] = useMutation(ADD_SUBREDDIT)
  
    const { data: subredditData } = useSuspenseQuery(GET_SUBREDDIT_BY_TOPIC, {
        variables: { topic: "learning nextjs" }
    })

    const onSubmit = handleSubmit(async (formData) => {

        console.log(formData)
        const notification = toast.loading("Creating a new post...")

        try {

            const subredditExists = data.getSubredditListByTopic.length > 0
            console.log(subredditData)

            //create post with new subreddit 

            if (!subredditExists) {
                const { data: { insertSubreddit: newSubreddit } } = await addSubreddit({
                    variables: {
                        topic: formData.postSubreddit,
                    }
                })

                console.log("Creating post with new subreddit...", formData);
                const image = formData.postImage || '';

                const {data: { insertPost: newPost }} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.email
                    }
                })

                console.log(newPost)
            } else {
                /// use existing subreddit to create post
                const { data } = await addPost({
                    variables:{
                        body: formData.postBody,
                        image: formData.postImage || '',
                        title: formData.postTitle,
                        subreddit_id: subredditData.id,
                        username: session?.user?.email
                    }
            
                })
            
                console.log(`New post created in ${formData.postSubreddit} subreddit`)
            }

                //reset form
                setValue("postTitle", "")
                setValue("postBody", "")
                setValue("postImage", "")
                setValue("postSubreddit", "")

                toast.success("Post created")
            }
        catch (error) {
            const err = error as Error
            toast.error(`Whoops something went wrong: ${err.message}`)
        }
    })



    return (
        <div>
            <form onSubmit= {onSubmit} className="sticky top-16 bg-white z-50 rounded-md border border-gray-300 p-2 mx-auto">
            <div className="flex flex-row-auto items-center space-x-3">

                <Avatar />

                <input 
                    {...register("postTitle", { required: "Sorry you need to put in a title"})}
                    disabled={!session}
                    type = "text" 
                    placeholder={session ? "Create a post by entering a title":"You need to be signed in"} 
                    className="bg-gray-50 w-full rounded-md p-2 flex-1 pl-5" />
    

                <LinkIcon className="icon-variant" />
                <PhotoIcon onClick={()=>setImageBoxOpen(!imageBoxOpen)}className={`icon-variant ${imageBoxOpen && 'text-blue-500'}`} />
            </div>

            {!!watch("postTitle") && (

                <div className="flex flex-col py-2">
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body </p>
                        <input 
                            {...register("postBody", { required: "Some text in the body is required" })} 
                            type="text" 
                            placeholder="Text" 
                            className="flex-1 m-2 bg-blue-50 p-2 outline-none rounded-md"
                        />
                    </div>
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit </p>
                        <input 
                            {...register("postSubreddit", { required: "A subreddit is required" })}
                            type="text" 
                            placeholder="Text" 
                            className="flex-1 m-2 bg-blue-50 p-2 outline-none rounded-md"
                            />
                    </div>


                {imageBoxOpen && (
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Image URL</p>
                        <input 
                            {...register("postImage" )} 
                            type="text" 
                            placeholder="Optional" 
                            className="flex-1 m-2 bg-blue-50 p-2 outline-none rounded-md"
                        />
                    </div>)}

                {/* Errors */}

                {Object.keys(errors).length > 0 && (
                    <div className="space-y-2 p-2 text-red-500">
                        {errors.postTitle?.type === "required" && <p>{errors.postTitle.message}</p>}
                        {errors.postBody?.type === "required" && <p>{errors.postBody.message}</p>}
                        {errors.postSubreddit?.type === "required" && <p>{errors.postSubreddit.message}</p>}
                    </div>

                )}

                {!!watch("postTitle") && (
                    <div>
                        <button type="submit" className="bg-blue-500 text-white flex-1 items-center rounded-md p-2 m-2 w-1/5 hover:bg-blue-300">Post</button>
                    </div>
                
                )}


                </div>)}

        </form>
        </div>
    )
}


export default PostBox;