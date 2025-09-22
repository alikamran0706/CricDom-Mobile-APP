import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Share, Text, TouchableOpacity } from 'react-native';

interface SocialShareProps {
  title?: string;
  message?: string;
  url?: string;
  color?: string;
  className?: string;
  text?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title = 'Cricdom App',
  message = 'Check out Cricdom! Play and follow cricket live. Download now:',
  url = 'https://expo.dev/@alikamran07/cricdom',
  color = "#374151",
  className = "w-10 h-10 rounded-full bg-gray-100 items-center justify-center",
  text = ''
}) => {
  const handleShare = async () => {
    console.log(Share,'ShareShareShareShare')
    try {
      const result = await Share.share({
        title,
        message: `${message}\n${url}`,
        url,
      });
 console.log(result,'resultresultresultresult')
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Content shared!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing content:', error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleShare}
      className={className}
    >
      <Feather name="share-2" size={20} color={color} />
      {
        text &&
        <Text className='text-gray-600'>{text}</Text>
      }
    </TouchableOpacity>
  );
};

export default SocialShare;
