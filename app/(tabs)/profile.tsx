import { ScrollView, View, Text, Image, Pressable } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { mockUsers, mockPosts } from '@/lib/mock-data';
import { useColors } from '@/hooks/use-colors';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const colors = useColors();
  const user = mockUsers.currentUser;
  const userPosts = mockPosts.filter((post) => post.userId === user.id);

  return (
    <ScreenContainer className="p-0" edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* رأس الملف الشخصي */}
        <View className="border-b border-border" style={{ borderBottomColor: colors.border }}>
          {/* صورة الغلاف */}
          <View className="h-32" style={{ backgroundColor: colors.primary }} />

          {/* بيانات المستخدم */}
          <View className="px-4 pb-4">
            {/* صورة الملف الشخصي */}
            <View className="mb-4 -mt-16">
              <Image
                source={{ uri: user.avatar }}
                className="w-32 h-32 rounded-full border-4"
                style={{ borderColor: colors.surface }}
              />
            </View>

            {/* الاسم والمعلومات */}
            <Text className="text-2xl font-black text-foreground mb-1">
              {user.name}
            </Text>
            <Text className="text-sm font-bold text-primary mb-3">
              {user.username}
            </Text>
            <Text className="text-sm text-foreground mb-4 leading-relaxed">
              {user.bio}
            </Text>

            {/* الإحصائيات */}
            <View className="flex-row justify-around mb-4 py-4 border-t border-b border-border"
              style={{ borderTopColor: colors.border, borderBottomColor: colors.border }}>
              <View className="items-center">
                <Text className="text-xl font-black text-primary">
                  {user.postsCount}
                </Text>
                <Text className="text-xs text-muted mt-1 font-bold">منشور</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-black text-primary">
                  {user.followersCount}
                </Text>
                <Text className="text-xs text-muted mt-1 font-bold">متابع</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-black text-primary">
                  {user.followingCount}
                </Text>
                <Text className="text-xs text-muted mt-1 font-bold">متابعة</Text>
              </View>
            </View>

            {/* الأزرار */}
            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 py-3 rounded-lg active:opacity-80"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-center font-black text-white text-sm">
                  تعديل الملف
                </Text>
              </Pressable>
              <Pressable
                className="px-4 py-3 border-2 rounded-lg active:opacity-70"
                style={{ borderColor: colors.primary }}
              >
                <IconSymbol name="paperplane" size={20} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* قسم المنشورات */}
        <View className="px-4 py-4">
          <Text className="text-lg font-black text-foreground mb-4">
            المنشورات ({userPosts.length})
          </Text>

          {userPosts.length > 0 ? (
            <View className="gap-4">
              {userPosts.map((post) => (
                <Pressable
                  key={post.id}
                  className="bg-surface rounded-lg overflow-hidden active:opacity-70"
                >
                  {post.image && (
                    <Image
                      source={{ uri: post.image }}
                      className="w-full aspect-square"
                    />
                  )}
                  <View className="p-3">
                    <Text className="text-xs text-foreground mb-2 leading-relaxed font-semibold">
                      {post.content}
                    </Text>
                    <View className="flex-row gap-4 text-xs text-muted">
                      <Text className="font-bold">{post.likesCount} إعجاب</Text>
                      <Text className="font-bold">{post.commentsCount} تعليق</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted font-semibold">لا توجد منشورات بعد</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
