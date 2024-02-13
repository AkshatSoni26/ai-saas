'use client'

interface message {
    role: "user" | "modal",
    messages: string
}

import * as z from "zod";
import axios from 'axios'

import Heading from "@/components/Heading";
import { ImageIcon, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/botAvatar";
import ReactMarkdown from 'react-markdown'
import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";



function ImagePage() {

    const router = useRouter()

    const [images, setImages] = useState<string[]>([])
    const proModal = useProModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const userMessage = values.prompt
            const response = await axios.post('/api/code', {
                messages: userMessage
            })


            form.reset()

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            }
            console.log(error)
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into an image."
                bgColor="bg-pink-700/10"
                iconColor="text-pink-700"
                icon={ImageIcon}
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of a horse in Swiss alphs."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-12 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-20">
                                <Loader />
                            </div>
                        )
                    }
                    {images.length === 0 && !isLoading && (
                        <Empty label="No images generated." />
                    )}
                    <div>
                        Images will be rendered here.

                        Work is pending in Image geration.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage