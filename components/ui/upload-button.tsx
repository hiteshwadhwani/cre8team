'use client'

import Image from "next/image"
import { CldUploadButton } from 'next-cloudinary';
import { useEffect, useState } from "react";

interface UploadButtonProps{
    value?: string,
    onChange: (val: string) => void
    disabled: boolean
}

const UploadButton = ({value, onChange, disabled} : UploadButtonProps) => {
    const [mounted, isMounted] = useState(false)
    useEffect(() => {
        isMounted(true)
    }, [])
    if(!mounted){
        return null
    }

    return (
        <CldUploadButton uploadPreset="cre8team" onUpload={(res) => console.log(res)} />
    )
}
export default UploadButton