'use client'
import styles from "../page.module.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import moment from "moment";

export default function PromoPage() {
  const [promotion, setPromotion] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) {
      redirect('/login')
      return
    }

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

  useEffect(() => {
    const token = Cookies.get('token')

    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/promotions/available', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      const data = await response.json();
      setPromotion(data);
    };
    fetchData();
  });

  function handleClick(id) {
    const token = Cookies.get('token')

    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/users/redeem/${id}`, {
        method: 'post',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
    };
    fetchData();
  }

  if(promotion) {
    return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Available Promotions</h1>
          {promotion.map(promotion => (
            <div key={promotion.promoId} className={styles.promoCard}>
              <h2>{promotion.title}</h2>
                <div className={styles.promoBadgeContainer}>
                  {
                    promotion.types.map(promoType=>(
                      <div key={promoType} className={styles.promoBadge}>
                        {promoType}
                      </div>
                    ))
                  }
                </div>
                <div className={styles.promoDescription}>{promotion.description}</div>
                <div className={styles.promoPartner}>By {promotion.partners}</div>
                <div>From {moment(promotion.start).format('DD/MM/YYYY HH:mm:ss')}</div>
                <div>To {moment(promotion.end).format('DD/MM/YYYY HH:mm:ss')}</div>
                <div className={styles.promoRedeemContainer}>
                  <button className={styles.promoRedeem} onClick={() => handleClick(promotion.promoId)}>Redeem</button>
                </div>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
  } else {
    return (
      <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>No Promotion!!!</h1>
        </div>
      </main>
      </div>
    )
  }
}
