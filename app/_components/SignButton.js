function SignButton({ children, buttonAction }) {
  
  return (
    <button className="signbutton"
      type="submit"
      form={buttonAction}
    >
      {children}
    </button>
  )
}

export default SignButton
