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
          <View className="h-32 bg-gradient-to-r from-primary to-primary opacity-20" />

          {/* بيانات المستخدم */}
          <View className="px-4 pb-4">
            {/* صورة الملف الشخصي */}
            <View className="mb-4 -mt-16">
              <Image
                source={{ uri: user.avatar }}
                className="w-32 h-32 rounded-full border-4 border-surface"
                style={{ borderColor: colors.surface }}
              />
            </View>

            {/* الاسم والمعلومات */}
            <Text className="text-2xl font-bold text-foreground mb-1">
              {user.name}
            </Text>
            <Text className="text-base text-muted mb-3">
              {user.username}
            </Text>
            <Text className="text-sm text-foreground mb-4 leading-relaxed">
              {user.bio}
            </Text>

            {/* الإحصائيات */}
            <View className="flex-row justify-around mb-4 py-3 border-t border-b border-border"
              style={{ borderTopColor: colors.border, borderBottomColor: colors.border }}>
              <View className="items-center">
                <Text className="text-xl font-bold text-foreground">
                  {user.postsCount}
                </Text>
                <Text className="text-xs text-muted mt-1">منشور</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-foreground">
                  {user.followersCount}
                </Text>
                <Text className="text-xs text-muted mt-1">متابع</Text>
              </View>
              <View className="items-center">
                <Text className="text-xl font-bold text-foreground">
                  {user.followingCount}
                </Text>
                <Text className="text-xs text-muted mt-1">متابعة</Text>
              </View>
            </View>

            {/* الأزرار */}
            <View className="flex-row gap-3">
              <Pressable
                className="flex-1 bg-primary py-3 rounded-lg active:opacity-80"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-center font-semibold text-background">
                  تعديل الملف الشخصي
                </Text>
              </Pressable>
              <Pressable
                className="px-4 py-3 border border-border rounded-lg active:opacity-70"
                style={{ borderColor: colors.border }}
              >
                <IconSymbol name="paperplane" size={20} color={colors.foreground} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* قسم المنشورات */}
        <View className="px-4 py-4">
          <Text className="text-lg font-bold text-foreground mb-4">
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
                    <Text className="text-sm text-foreground mb-2 leading-relaxed">
                      {post.content}
                    </Text>
                    <View className="flex-row gap-4 text-xs text-muted">
                      <Text>{post.likesCount} إعجاب</Text>
                      <Text>{post.commentsCount} تعليق</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-8">
              <Text className="text-muted">لا توجد منشورات بعد</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
