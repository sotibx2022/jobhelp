import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Copy, CheckCheckIcon, X } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useDebounce } from '@/app/functions/helperFunctions/debounce'
import Divider from '@/app/_components/common/Divider'
import Image from 'next/image'
import facebook from './../../../../public/socialicons/facebook.png'
import linkedin from './../../../../public/socialicons/linkedin.png'
import twitter from './../../../../public/socialicons/twitter.png'
import whatsapp from './../../../../public/socialicons/whatsapp.png'
import { DisplayContext } from '@/app/context/DisplayComponent'
const ShareProfileInfo = () => {
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
    const [shareableUrl, setShareableUrl] = useState("https://yourdomain.com/username")
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(shareableUrl)
        setCopied(true)
    }
    useDebounce({
        callback: () => {
            if (copied) {
                setCopied(false)
            }
        },
        delay: 2000,
        dependencies: [copied]
    })
    return (
        <div className='fixed top-1/2 transform -translate-y-1/2 right-0 flexCenter'>
            <div className="max-w-md mx-auto relative">
                <Button variant={"outline"} className='absolute right-0 top-0' onClick={() => setVisibleComponent('shareButton')}>
                    <X />
                </Button>
                <Card>
                    <CardHeader>
                        <h2 className="secondaryHeading">Share Your Profile</h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Shareable Link Section */}
                        <div className="flex flex-col gap-2">
                            <label className="primaryParagraph">Shareable Link</label>
                            <div className="flex items-center gap-2">
                                <Input type="text" readOnly value={shareableUrl} className={`flex-1 ${copied ? "border-green-500" : ""}`} />
                                <Button variant="outline" size="icon" onClick={handleCopy} title="Copy link" disabled={copied}>
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                            {copied && <p className='text-green-500 flex gap-2 text-sm items-center'><CheckCheckIcon className='w-4 h-4' /> <span>url Copied</span></p>}
                        </div>
                        {/* Social Share Section */}
                        <div className="space-y-3">
                            <Divider text='Share on Social Media' />
                            <div className="flex flex-wrap gap-3">
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition">
                                    <Image src={facebook} alt="Facebook" width={16} height={16} /> Facebook
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm cursor-pointer hover:bg-blue-100 transition">
                                    <Image src={linkedin} alt="LinkedIn" width={16} height={16} /> LinkedIn
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm cursor-pointer hover:bg-green-100 transition">
                                    <Image src={whatsapp} alt="WhatsApp" width={16} height={16} /> WhatsApp
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-sm cursor-pointer hover:bg-sky-100 transition">
                                    <Image src={twitter} alt="Twitter" width={16} height={16} /> Twitter
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
export default ShareProfileInfo
