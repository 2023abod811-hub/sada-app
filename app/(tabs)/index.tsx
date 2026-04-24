import { View, Text, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { PostCard } from '@/components/post-card';
import { mockPosts } from '@/lib/mock-data';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const colors = useColors();
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleSave = (postId: string) => {
    console.log('Save post:', postId);
  };

  return (
    <ScreenContainer className="p-0" edges={['top', 'left', 'right']}>
      {/* رأس الشاشة */}
      <View
        className="flex-row items-center justify-between px-4 py-4 border-b border-border"
        style={{ borderBottomColor: colors.border }}
      >
        <Text className="text-3xl font-black text-primary">صدى</Text>
        <View className="flex-row gap-2">
          <Pressable className="p-2 active:opacity-60" style={{ backgroundColor: colors.surface }}>
            <IconSymbol name="bell" size={22} color={colors.primary} />
          </Pressable>
          <Pressable className="p-2 active:opacity-60" style={{ backgroundColor: colors.surface }}>
            <IconSymbol name="paperplane" size={22} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      {/* قائمة المنشورات */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onSave={handleSave}
          />
        )}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </ScreenContainer>
  );
}
