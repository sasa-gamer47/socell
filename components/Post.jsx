import React from 'react'
import Image from 'next/image'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AiOutlineLike, AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import testImg from '../images/testImg.jpg'
import testImg2 from '../images/testImg2.jpg'

const Post = ({ post }) => {
    return (
        <div className="w-full p-1">
            <div className="flex items-center py-2">
                <div className="h-50 ml-5 overflow-hidden rounded-full">
                <Image
                    src={testImg2}
                    width={'50'}
                    height={'50'}
                    fill="responsive"
                />
                </div>
                <div className="flex h-full w-full items-center justify-between px-4">
                <h1 className="ml-2 text-xl font-bold">default name</h1>
                <div className="text-2xl hover:cursor-pointer">
                    <BiDotsVerticalRounded />
                </div>
                </div>
            </div>
            <div className="w-full">
                <Image src={testImg} fill="responsive" />
            </div>
            <p className="text-lg p-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel ab
                voluptatibus beatae. Ad, ex cupiditate explicabo sapiente optio fugit et
                rerum ratione quidem dolorum amet illum, recusandae aspernatur corporis
                hic!
            </p>
            <div className="mt-3 flex items-center gap-x-5 text-xl">
                <div className="ml-2 hover:cursor-pointer">
                <AiOutlineLike />
                </div>
                <div className="hover:cursor-pointer">
                <AiOutlineHeart />
                </div>
                <div className="hover:cursor-pointer">
                <AiOutlineShareAlt />
                </div>
            </div>
            <div className="mt-3 flex w-full items-center gap-x-2 text-lg">
                <input
                className="mr-5 w-full rounded-lg bg-transparent p-1 focus:outline-yellow-500"
                type="text"
                placeholder="Commenta..."
                />
                <button className="mr-5 rounded-lg bg-sky-100 p-1 px-5 transition duration-300 hover:bg-sky-200 dark:bg-slate-700 dark:hover:bg-slate-600">
                Invia
                </button>
            </div>
        </div>
    )   
}

export default Post