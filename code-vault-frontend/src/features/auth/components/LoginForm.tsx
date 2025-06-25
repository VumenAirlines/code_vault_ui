import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '../hooks/useLogin';
import { loginFormSchema } from '../schemas/loginFormSchema';

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

export const LoginForm = ()=>{
    const loginMutation = useLogin();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { username: '', password: '' },
    });
    const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
        loginMutation.mutate(data)
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
        <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
        {loginMutation.isError && (
          <p className="text-sm font-medium text-destructive">
            Invalid username or password.
          </p>
        )}
      </form>
    </Form>
  )
}