import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Post } from '@/lib/types';
import { useColors } from '@/hooks/use-colors';
import { IconSymbol } from './ui/icon-symbol';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onSave?: (postId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onSave,
}: PostCardProps) {
  const colors = useColors();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLike?.(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `قبل ${minutes} دقيقة`;
    if (hours < 24) return `قبل ${hours} ساعة`;
    if (days < 7) return `قبل ${days} يوم`;
    return new Date(date).toLocaleDateString('ar-SA');
  };

  return (
    <View
      className="bg-surface border-b border-border"
      style={{ borderBottomColor: colors.border }}
    >
      {/* رأس المنشور - بيانات المستخدم */}
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center flex-1">
          <Image
            source={{ uri: post.user.avatar }}
            className="w-12 h-12 rounded-full"
          />
          <View className="ml-3 flex-1">
            <Text className="text-base font-semibold text-foreground">
              {post.user.name}
            </Text>
            <Text className="text-sm text-muted">
              {post.user.username} • {formatDate(post.createdAt)}
            </Text>
          </View>
        </View>
        <Pressable className="p-2">
          <IconSymbol name="chevron.right" size={24} color={colors.muted} />
        </Pressable>
      </View>

      {/* محتوى المنشور */}
      {post.content && (
        <View className="px-4 pb-3">
          <Text className="text-base text-foreground leading-relaxed">
            {post.content}
          </Text>
        </View>
      )}

      {/* صورة المنشور */}
      {post.image && (
        <Image
          source={{ uri: post.image }}
          className="w-full aspect-square"
        />
      )}

      {/* إحصائيات المنشور */}
      <View className="flex-row justify-between px-4 py-2 border-t border-border">
        <Text className="text-sm text-muted">
          {likesCount} إعجاب
        </Text>
        <View className="flex-row gap-4">
          <Text className="text-sm text-muted">
            {post.commentsCount} تعليق
          </Text>
          <Text className="text-sm text-muted">
            {post.sharesCount} مشاركة
          </Text>
        </View>
      </View>

      {/* أزرار التفاعل */}
      <View className="flex-row justify-around border-t border-border">
        <Pressable
          onPress={handleLike}
          className="flex-row items-center justify-center flex-1 py-3 active:opacity-70"
        >
          <IconSymbol
            name={isLiked ? 'heart.fill' : 'heart'}
            size={20}
            color={isLiked ? '#EF4444' : colors.muted}
          />
          <Text className={`ml-2 text-sm font-medium ${isLiked ? 'text-error' : 'text-muted'}`}>
            إعجاب
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onComment?.(post.id)}
          className="flex-row items-center justify-center flex-1 py-3 active:opacity-70"
        >
          <IconSymbol name="bubble.right" size={20} color={colors.muted} />
          <Text className="ml-2 text-sm font-medium text-muted">
            تعليق
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onShare?.(post.id)}
          className="flex-row items-center justify-center flex-1 py-3 active:opacity-70"
        >
          <IconSymbol name="paperplane" size={20} color={colors.muted} />
          <Text className="ml-2 text-sm font-medium text-muted">
            مشاركة
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          className="flex-row items-center justify-center flex-1 py-3 active:opacity-70"
        >
          <IconSymbol
            name={isSaved ? 'bookmark.fill' : 'bookmark'}
            size={20}
            color={isSaved ? colors.primary : colors.muted}
          />
          <Text className={`ml-2 text-sm font-medium ${isSaved ? 'text-primary' : 'text-muted'}`}>
            حفظ
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
