'use client'
import styles from "../page.module.css";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import moment from "moment";

export default function PromoPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token || token ==='') {
      redirect('/login')
    }

    const validateToken = async () => {
      try {
        const res = await fetch('http://localhost:3000/users/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json();
        setUserInfo(data.email);
        if (!res.ok) {redirect('/login')}
      } catch (error) {
        console.error(error)
      }
    }

    validateToken()
  }, [router])

  useEffect(() => {
    const token = Cookies.get('token')

    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/promotions/redeemed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      const data = await response.json();
      setPromotion(data);
    };
    fetchData();
  });

  function handleViewPromotionClick(e) {
    e.preventDefault();
    router.push("/promotion");
  }

  function handleLogoutClick(e) {
    e.preventDefault();
    document.cookie = `token='';expires=Thu, 01 Jan 1970 00:00:01 GMT`
    redirect("/login");
  }

  if(promotion && Array.isArray(promotion)) {
    return (
    <div className={styles.page}>
      <h2>Welcome, {userInfo}</h2>
      <a href="/login" onClick={handleLogoutClick}>Logout</a>
      <main className={styles.main}>
        <div>
          <h1>Redeemed Promotions</h1>
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
            </div>
          ))}
          <div>
            <a href="/promotion" onClick={handleViewPromotionClick}>View Available Promotions</a>
          </div>
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
