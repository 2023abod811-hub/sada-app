import { View, Text, TextInput, ScrollView, Pressable, Image, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import { mockUsers, mockPosts } from '@/lib/mock-data';

export default function SearchScreen() {
  const colors = useColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = [
      ...Object.values(mockUsers)
        .filter((user) =>
          user.name.toLowerCase().includes(lowerQuery) ||
          user.username.toLowerCase().includes(lowerQuery)
        )
        .map((user) => ({ type: 'user', data: user })),
      ...mockPosts
        .filter((post) =>
          post.content.toLowerCase().includes(lowerQuery)
        )
        .map((post) => ({ type: 'post', data: post })),
    ];
    setSearchResults(results);
  };

  const trendingHashtags = [
    { tag: '#تطوير_الويب', count: 1250 },
    { tag: '#التصميم', count: 3450 },
    { tag: '#البرمجة', count: 5670 },
    { tag: '#الفن', count: 2340 },
    { tag: '#التصوير', count: 4560 },
    { tag: '#التكنولوجيا', count: 6789 },
  ];

  return (
    <ScreenContainer className="p-0" edges={['top', 'left', 'right']}>
      {/* شريط البحث */}
      <View className="px-4 py-3 border-b border-border" style={{ borderBottomColor: colors.border }}>
        <View
          className="flex-row items-center bg-surface rounded-full px-4 py-2"
          style={{ backgroundColor: colors.surface }}
        >
          <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
          <TextInput
            placeholder="ابحث عن مستخدمين أو منشورات..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={handleSearch}
            className="flex-1 ml-3 text-foreground"
            style={{ color: colors.foreground }}
          />
          {searchQuery && (
            <Pressable onPress={() => handleSearch('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.muted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* النتائج أو الهاشتاجات الشهيرة */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {searchResults.length > 0 ? (
          <View className="p-4">
            <Text className="text-lg font-bold text-foreground mb-4">
              نتائج البحث
            </Text>
            {searchResults.map((result, index) => (
              <Pressable
                key={index}
                className="flex-row items-center py-3 border-b border-border active:opacity-70"
                style={{ borderBottomColor: colors.border }}
              >
                {result.type === 'user' ? (
                  <>
                    <Image
                      source={{ uri: result.data.avatar }}
                      className="w-12 h-12 rounded-full"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-base font-semibold text-foreground">
                        {result.data.name}
                      </Text>
                      <Text className="text-sm text-muted">
                        {result.data.username} • {result.data.followersCount} متابع
                      </Text>
                    </View>
                  </>
                ) : (
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground mb-1">
                      {result.data.user.name}
                    </Text>
                    <Text className="text-sm text-foreground leading-relaxed">
                      {result.data.content}
                    </Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        ) : (
          <View className="p-4">
            <Text className="text-lg font-bold text-foreground mb-4">
              الهاشتاجات الشهيرة
            </Text>
            {trendingHashtags.map((hashtag, index) => (
              <Pressable
                key={index}
                className="flex-row items-center justify-between py-3 border-b border-border active:opacity-70"
                style={{ borderBottomColor: colors.border }}
              >
                <View>
                  <Text className="text-base font-semibold text-primary">
                    {hashtag.tag}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {hashtag.count} منشور
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
