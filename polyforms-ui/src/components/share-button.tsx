"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Share2, Link, Code } from "lucide-react"

export function ShareButtonComponent({ url = "https://example.com/share-page" }) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const iframeCode = `<iframe src="${url}" width="100%" height="500" frameborder="0"></iframe>`

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(null), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => copyToClipboard(url, 'url')}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <Link className="mr-2 h-4 w-4" />
                  Copy URL
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copiedItem === 'url' ? 'Copied!' : 'Copy URL'}</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copyToClipboard(iframeCode, 'iframe')}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center">
                  <Code className="mr-2 h-4 w-4" />
                  Copy iframe
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copiedItem === 'iframe' ? 'Copied!' : 'Copy iframe'}</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}