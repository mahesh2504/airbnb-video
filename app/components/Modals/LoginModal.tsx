'use client'
import {signIn} from 'next-auth/react'
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from 'react-icons/fc';
import Input from "../inputs/Input";
import { useCallback, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import toast from 'react-hot-toast';
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from 'next/navigation';


const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setISLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,

    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setISLoading(true);
    signIn('credentials', {
      ...data,
      redirect:false
    }).then((callback) => {
      setISLoading(false);
      if (callback?.ok) {
        toast.success("Login Successfull")
        router.refresh();
        loginModal.onClose();

      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>

    
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with google" icon={FcGoogle} onClick={()=>{}}/>
      <Button outline label="Continue with github" icon={AiFillGithub} onClick={() => { }} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex felx-row items-center gap-2 justify-center">
          <div>Already have an account ?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline text-center" onClick={registerModal.onClose}> Login</div>
        </div>
      </div>
    </div>
  )
  return ( 
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
   );
}
 
export default LoginModal;