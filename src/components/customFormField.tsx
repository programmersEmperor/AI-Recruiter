import { Input } from "@/components/ui/input"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"


type FormFieldProps<T extends FieldValues> = {
    control: Control<T>
    name: Path<T>
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password' | 'file';
}

export default function CustomFormField<T extends FieldValues>({control, name, label, placeholder, type = 'text'} : FormFieldProps<T>){
    return <Controller 
    control={control} 
    name={name} 
    render={({field})=>(
    <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
            <Input 
                className="input"
                placeholder={placeholder}
                type={type}
                {...field}
            />
        </FormControl>
        <FormMessage />
    </FormItem>
    )} />
}