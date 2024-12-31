'use client'
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!user) {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, router]);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="transition-all duration-300 md:pl-64">
        <div className="p-4 pt-20 md:pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}
