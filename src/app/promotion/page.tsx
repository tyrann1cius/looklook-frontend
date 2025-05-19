'use client'
import styles from "../page.module.css";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import moment from "moment";

export default function PromoPage() {
  // const data = await fetch('http://localhost:3000/promotions')
  // const promotions = await data.json()

  // return (
  //   <div className={styles.page}>
  //     <main className={styles.main}>
  //       <div>
  //         <h1>Available Promotions</h1>
  //         {promotions.map(promotion => (
  //           <div key={promotion.promoId} className={styles.promoCard}>
  //             <h2>{promotion.title}</h2>
  //               <div className={styles.promoBadgeContainer}>
  //                 {
  //                   promotion.types.map(promoType=>(
  //                     <div key={promoType} className={styles.promoBadge}>
  //                       {promoType}
  //                     </div>
  //                   ))
  //                 }
  //               </div>
  //               <div className={styles.promoDescription}>{promotion.description}</div>
  //               <div className={styles.promoPartner}>By {promotion.partners}</div>
  //               <div>From {moment(promotion.start).format('DD/MM/YYYY HH:mm:ss')}</div>
  //               <div>To {moment(promotion.end).format('DD/MM/YYYY HH:mm:ss')}</div>
  //               <div className={styles.promoRedeemContainer}>
  //                 <button className={styles.promoRedeem}>Redeem</button>
  //               </div>
  //           </div>
  //         ))}
  //       </div>
  //     </main>
  //     <footer className={styles.footer}>
  //     </footer>
  //   </div>
  // );

  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) {
      router.replace('/login') // If no token is found, redirect to login page
      return
    }

    // Validate the token by making an API call
    const validateToken = async () => {
      try {
        const res = await fetch('http://localhost:3000/promotions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error('Token validation failed')
      } catch (error) {
        console.error(error)
        router.push('/login') // Redirect to login if token validation fails
      }
    }

    validateToken()
  }, [router])

  return <div>Protected Content</div>

}
