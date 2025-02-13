import { createLazyFileRoute } from '@tanstack/react-router'
import { PageRegister } from '../pages/register/page-register'

export const Route = createLazyFileRoute('/register')({
  component: PageRegister,
})
