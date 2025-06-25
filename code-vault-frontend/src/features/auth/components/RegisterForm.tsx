import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useRegister} from "../hooks/useRegister"
import { registerFormSchema } from '../schemas/registerFormSchema';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';

export const RegisterForm = ()=>{
    const registerMutation = useRegister();
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: { username: '', email:'', password: '' },
    });
    const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
        registerMutation.mutate(data)
    }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
        control={form.control}
        name='email'
        render={({ field })=>(
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="email" placeholder='Email' {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name='password'
        render={({ field })=>(
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' placeholder='Password' {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
         <FormField
        control={form.control}
        name='confirmPassword'
        render={({ field })=>(
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' placeholder='Confirm password' {...field}/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}
        />
        <Button type="submit" disabled={registerMutation.isPending}>
            {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
        </Button>
        {registerMutation.isError && (
          <p className="text-sm font-medium text-destructive">
            Invalid username or password.
          </p>
        )}
      </form>
    </Form>
  )
}