import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const colors = useColors();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    setLoading(true);
    try {
      // هنا سيتم إضافة API للتحقق من بيانات المستخدم
      // للآن نستخدم بيانات وهمية
      if (email === 'test@example.com' && password === '123456') {
        // حفظ بيانات المستخدم
        localStorage.setItem('user', JSON.stringify({ email, id: 1 }));
        router.replace('/(tabs)');
      } else {
        Alert.alert('خطأ', 'بيانات الدخول غير صحيحة');
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer containerClassName={`bg-background`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center px-6 gap-6">
          {/* العنوان */}
          <View className="items-center gap-2 mb-8">
            <Text className="text-4xl font-bold text-foreground">صدى</Text>
            <Text className="text-base text-muted">تسجيل الدخول</Text>
          </View>

          {/* حقل البريد الإلكتروني */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">البريد الإلكتروني</Text>
            <TextInput
              placeholder="أدخل بريدك الإلكتروني"
              placeholderTextColor={colors.muted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
              style={{
                backgroundColor: colors.surface,
                color: colors.foreground,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
              }}
            />
          </View>

          {/* حقل كلمة المرور */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">كلمة المرور</Text>
            <TextInput
              placeholder="أدخل كلمة المرور"
              placeholderTextColor={colors.muted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              style={{
                backgroundColor: colors.surface,
                color: colors.foreground,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
              }}
            />
          </View>

          {/* زر تسجيل الدخول */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              opacity: loading ? 0.7 : 1,
            }}
            className="rounded-lg py-4 items-center mt-4"
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            </Text>
          </TouchableOpacity>

          {/* رابط التسجيل */}
          <View className="flex-row justify-center gap-2 mt-4">
            <Text className="text-muted">ليس لديك حساب؟ </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text className="text-primary font-semibold">إنشاء حساب جديد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
