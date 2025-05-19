'use client';
import styles from "../page.module.css";
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
        const body = await response.json()
        document.cookie = `token=${body.token}; path=/`
        router.push('/promotion');
    } else {
      // Handle errors
      console.log('NO');
    }
  }
 
  return (
     <div className={styles.page}>
          <main className={styles.main}>
            <h1>User Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <input className={styles.loginTbx} type="email" name="email" placeholder="Email" required />
              <input className={styles.loginTbx} type="password" name="password" placeholder="Password" required />
              <button className={styles.loginBtn} type="submit">Login</button>
            </form>
          </main>
    </div>
  )
}
