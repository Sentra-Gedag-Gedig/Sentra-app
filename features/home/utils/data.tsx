import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const TABS = ["Harian", "Mingguan", "Bulanan"];

export const transactions = [
  {
    id: "1",
    date: "Senin, 3/10",
    type: "Pendapatan",
    amount: "Rp3.000.000",
    category: "Gaji Bulanan",
    description: "Uang dari bos",
    icon: <MaterialIcons name="attach-money" size={24} color="white" />,
    color: "#00BE2C",
  },
  {
    id: "2",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "3",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "4",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "5",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "6",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
];

export const expenseCategories = [
  {
    title: "Makanan",
    icon: <FontAwesome6 name="bowl-food" size={24} color="#00027d" />,
  },
  {
    title: "Sehari-hari",
    icon: <FontAwesome6 name="cart-shopping" size={24} color="#00027d" />,
  },
  {
    title: "Transportasi",
    icon: <MaterialIcons name="commute" size={24} color="#00027d" />,
  },
  {
    title: "Sosial",
    icon: <FontAwesome6 name="users" size={24} color="#00027d" />,
  },
  {
    title: "Perumahan",
    icon: <Feather name="home" size={24} color="#00027d" />,
  },
  {
    title: "Hadiah",
    icon: <FontAwesome6 name="gift" size={24} color="#00027d" />,
  },
  {
    title: "Komunikasi",
    icon: <Feather name="message-square" size={24} color="#00027d" />,
  },
  {
    title: "Pakaian",
    icon: <FontAwesome6 name="shirt" size={24} color="#00027d" />,
  },
  { title: "Hiburan", icon: <Ionicons name="tv" size={24} color="#00027d" /> },
  {
    title: "Tampilan",
    icon: <MaterialCommunityIcons name="mirror" size={24} color="black" />,
  },
  {
    title: "Kesehatan",
    icon: <FontAwesome6 name="heart-pulse" size={24} color="#00027d" />,
  },
  {
    title: "Pajak",
    icon: <FontAwesome6 name="file-invoice-dollar" size={24} color="#00027d" />,
  },
  {
    title: "Pendidikan",
    icon: <FontAwesome6 name="graduation-cap" size={24} color="#00027d" />,
  },
  {
    title: "Investasi",
    icon: <Feather name="trending-up" size={24} color="#00027d" />,
  },
  {
    title: "Peliharaan",
    icon: <FontAwesome6 name="paw" size={24} color="#00027d" />,
  },
  {
    title: "Liburan",
    icon: <FontAwesome6 name="umbrella-beach" size={24} color="#00027d" />,
  },
];

export const incomeCategories = [
  {
    title: "Gaji",
    icon: <FontAwesome6 name="money-bill" size={24} color="#00027d" />,
  },
  {
    title: "Bonus",
    icon: <FontAwesome6 name="money-check-dollar" size={24} color="#00027d" />,
  },
  {
    title: "Investasi",
    icon: <Feather name="trending-up" size={24} color="#00027d" />,
  },
  {
    title: "Part Time",
    icon: <MaterialIcons name="work-outline" size={24} color="#00027d" />,
  },
];
