import { useRouter } from "expo-router";

export const literasiActions = () => {
  const router = useRouter();

  const handleNewsPress = (newsId: string) => {
    console.log("News pressed:", newsId);
    router.push(`/(main)/literasi/${newsId}`);
  };

  return {
    handleNewsPress,
  };
};
