import FancyFormMobile, {
  type FieldForm,
} from '@/routes/___shared/fancy-form-mobile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/sign-in/')({
  component: RouteComponent,
});

function RouteComponent() {
  const fields: FieldForm[] = [
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      placeHolder: 'Enter your email',
      rules: [{ required: true, message: 'Email is required' }],
    },
    {
      key: 'password',
      label: 'Password',
      type: 'password',
      placeHolder: 'Enter your password',
      rules: [{ required: true, message: 'Password is required' }],
    },
    {
      key: 'submit',
      text: 'Sign In',
      type: 'action',
      onSubmit: (data) => {
        console.log('Sign In data:', data);
      },
      props: {
        type: 'primary',
        className: 'w-full',
      },
    },
  ];
  return <FancyFormMobile render={fields} />;
}
