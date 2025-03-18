import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'wouter';
import { SiGoogle } from 'react-icons/si';

export default function LoginPage() {
  const { loginWithGoogle, isLoading, error } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-slate-600">
              Đăng nhập để lưu trữ và quản lý lịch sử trò chuyện của bạn với các mô hình AI khác nhau.
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <Button
            onClick={loginWithGoogle}
            disabled={isLoading}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 h-12 text-base"
          >
            <SiGoogle className="h-5 w-5" />
            <span>Đăng nhập với Google</span>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500">
            Tiếp tục với tư cách khách?{' '}
            <Link href="/" className="text-primary hover:underline">
              Quay lại
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}