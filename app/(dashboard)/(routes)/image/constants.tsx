import * as z from 'zod'

export const formSchema = z.object({
    prompt: z.string().min(1,{
        message: "Prompt is required.",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
})


export const amountOptions = [
    {
        value:"1",
        label: "1 Photo"
    },
    {
        value:"2",
        label: "2 Photo"
    },
    {
        value:"3",
        label: "3 Photo"
    },
    {
        value:"4",
        label: "4 Photo"
    },
    {
        value:"5",
        label: "5 Photo"
    }
];

export const resolutionOptions = [
    {
        value: "256*256",
        label:"256x256"
    },
    {
      value:"512*512",
      label:"512*512",  
    },
    {   
        value: "1024*1024",
        label:'1024*1024'
    },
]