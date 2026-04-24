import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useColors } from '@/hooks/use-colors';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { mockUsers } from '@/lib/mock-data';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  user: typeof mockUsers.user1;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers.user1,
    message: 'أعجب بمنشورك',
    time: 'قبل 5 دقائق',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: mockUsers.user2,
    message: 'علق على منشورك: "رائع جداً! 👏"',
    time: 'قبل 30 دقيقة',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: mockUsers.user3,
    message: 'بدأ متابعتك',
    time: 'قبل ساعة',
    isRead: true,
  },
  {
    id: '4',
    type: 'like',
    user: mockUsers.user1,
    message: 'أعجب بمنشورك',
    time: 'قبل 2 ساعة',
    isRead: true,
  },
  {
    id: '5',
    type: 'message',
    user: mockUsers.user2,
    message: 'أرسل لك رسالة جديدة',
    time: 'قبل 3 ساعات',
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const colors = useColors();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return 'heart.fill';
      case 'comment':
        return 'bubble.right';
      case 'follow':
        return 'person.badge.plus';
      case 'message':
        return 'paperplane';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like':
        return '#EF4444';
      case 'comment':
        return colors.primary;
      case 'follow':
        return colors.primary;
      case 'message':
        return colors.primary;
      default:
        return colors.muted;
    }
  };

  return (
    <ScreenContainer className="p-0" edges={['top', 'left', 'right']}>
      {/* رأس الشاشة */}
      <View
        className="px-4 py-4 border-b border-border flex-row items-center justify-between"
        style={{ borderBottomColor: colors.border }}
      >
        <Text className="text-2xl font-bold text-foreground">الإشعارات</Text>
        <Pressable className="p-2 active:opacity-70">
          <IconSymbol name="ellipsis" size={24} color={colors.foreground} />
        </Pressable>
      </View>

      {/* قائمة الإشعارات */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {mockNotifications.length > 0 ? (
          <View>
            {mockNotifications.map((notification) => (
              <Pressable
                key={notification.id}
                className={`flex-row items-center p-4 border-b border-border active:opacity-70 ${
                  !notification.isRead ? 'bg-surface' : ''
                }`}
                style={{
                  borderBottomColor: colors.border,
                  backgroundColor: !notification.isRead ? colors.surface : 'transparent',
                }}
              >
                {/* صورة المستخدم */}
                <Image
                  source={{ uri: notification.user.avatar }}
                  className="w-12 h-12 rounded-full"
                />

                {/* محتوى الإشعار */}
                <View className="ml-3 flex-1">
                  <Text className="text-base font-semibold text-foreground">
                    {notification.user.name}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {notification.message}
                  </Text>
                  <Text className="text-xs text-muted mt-1">
                    {notification.time}
                  </Text>
                </View>

                {/* أيقونة الإشعار */}
                <View
                  className="w-10 h-10 rounded-full items-center justify-center ml-2"
                  style={{
                    backgroundColor: getNotificationColor(notification.type) + '20',
                  }}
                >
                  <IconSymbol
                    name={getNotificationIcon(notification.type) as any}
                    size={18}
                    color={getNotificationColor(notification.type)}
                  />
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center">
            <IconSymbol name="bell" size={48} color={colors.muted} />
            <Text className="text-lg text-muted mt-4">لا توجد إشعارات</Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
