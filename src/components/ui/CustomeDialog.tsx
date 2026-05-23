"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// ۱. پس‌زمینه تاریک و تیره (با انیمیشن)
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay asChild {...props}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm", className)}
    />
  </DialogPrimitive.Overlay>
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// ۲. محفظه اصلی دیالوگ (دارای dir="rtl" و انیمیشن باز شدن از وسط)
// ۲. محفظه اصلی دیالوگ (دارای انیمیشن استاندارد و اسکرول مخفی)
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { isOpen: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
  <DialogPortal forceMount>
    {/* انیمیشن خروج بک‌دراپ */}
    <AnimatePresence>
      {isOpen && <DialogOverlay key="overlay" />}
    </AnimatePresence>

    {/* انیمیشن خروج و ورود بدنه اصلی دیالوگ */}
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPrimitive.Content asChild ref={ref} {...props}>
            <motion.div
              key="content"
              dir="rtl"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className={cn(
                "relative w-full max-w-xl bg-white rounded-[20px] shadow-2xl overflow-hidden p-6 text-zinc-900 text-right max-h-[90vh] overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
                className
              )}
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </div>
      )}
    </AnimatePresence>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// ۳. هدر دیالوگ (مخصوص عنوان و توضیحات بالایی)
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 text-right mb-4", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

// ۴. فوتر دیالوگ (مخصوص دکمه‌های تایید یا انصراف پایینی)
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-wrap items-center gap-2 justify-end mt-6", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

// ۵. عنوان اصلی دیالوگ
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-2xl font-bold text-zinc-900 md:text-3xl md:font-extrabold", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

// ۶. توضیحات فرعی زیر عنوان
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-zinc-700 md:text-lg", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}