import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';

export default function SignupScreen() {
  const colors = useColors();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمات المرور غير متطابقة');
      return;
    }

    if (password.length < 6) {
      Alert.alert('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setLoading(true);
    try {
      // هنا سيتم إضافة API لإنشاء حساب جديد
      // للآن نستخدم بيانات وهمية
      localStorage.setItem('user', JSON.stringify({ name, email, id: 1 }));
      Alert.alert('نجاح', 'تم إنشاء الحساب بنجاح');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer containerClassName={`bg-background`}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="flex-1 justify-center px-6 gap-4">
          {/* العنوان */}
          <View className="items-center gap-2 mb-6">
            <Text className="text-4xl font-bold text-foreground">صدى</Text>
            <Text className="text-base text-muted">إنشاء حساب جديد</Text>
          </View>

          {/* حقل الاسم */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">الاسم الكامل</Text>
            <TextInput
              placeholder="أدخل اسمك الكامل"
              placeholderTextColor={colors.muted}
              value={name}
              onChangeText={setName}
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

          {/* حقل تأكيد كلمة المرور */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">تأكيد كلمة المرور</Text>
            <TextInput
              placeholder="أعد إدخال كلمة المرور"
              placeholderTextColor={colors.muted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          {/* زر إنشاء الحساب */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={{
              backgroundColor: colors.primary,
              opacity: loading ? 0.7 : 1,
            }}
            className="rounded-lg py-4 items-center mt-4"
          >
            <Text className="text-white font-semibold text-lg">
              {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
            </Text>
          </TouchableOpacity>

          {/* رابط تسجيل الدخول */}
          <View className="flex-row justify-center gap-2 mt-4">
            <Text className="text-muted">هل لديك حساب بالفعل؟ </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-primary font-semibold">تسجيل الدخول</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
