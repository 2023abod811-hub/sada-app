import { ScrollView, View, Text, Pressable, FlatList } from 'react-native';
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
        className="flex-row items-center justify-between px-4 py-3 border-b border-border"
        style={{ borderBottomColor: colors.border }}
      >
        <Text className="text-2xl font-bold text-foreground">صدى</Text>
        <View className="flex-row gap-3">
          <Pressable className="p-2 active:opacity-70">
            <IconSymbol name="bell" size={24} color={colors.foreground} />
          </Pressable>
          <Pressable className="p-2 active:opacity-70">
            <IconSymbol name="paperplane" size={24} color={colors.foreground} />
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
