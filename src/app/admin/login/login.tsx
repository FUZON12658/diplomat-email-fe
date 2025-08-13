
import { AuthClientComponent } from "@/components/Common/Auth-Client-Component";
import { ImageWithFallback } from "@/components/Common/ImageWithFallback";
import { GalleryVerticalEnd } from "lucide-react"
import { Toaster } from "sonner";

export default function AuthComponent() {
  return (
    <div>
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white border-wyfPrimary border text-primary-foreground">
              <div className="w-24 h-24 flex items-center justify-center relative">
              <ImageWithFallback src="/logo.png" alt="wyf" imageClassname="object-contain mt-[0.125rem]" />
              </div>
            </div>
            Diplomat Nepal Email Client
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AuthClientComponent />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-transparent lg:block">
        <img
          src="/logo.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
    <Toaster/>
    </div>
  )
}
