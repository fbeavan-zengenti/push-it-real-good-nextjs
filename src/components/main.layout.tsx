import "@/theme/global.css";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}