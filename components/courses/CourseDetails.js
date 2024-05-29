import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const CourseDetails = ({title, person, date, courseImage}) => {
  const windowWidth = Dimensions.get("window").width;
  const scale = 20 / windowWidth;

  return (
    <View
      style={[styles.container, { paddingHorizontal: windowWidth * scale }]}
    >
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.subheader}>
        [BELAJAR CODING CUMAN MULAI DARI 15 RIBU AJA? WAH MURAH BANGET]
      </Text>
      <View style={styles.infoSection}>
        <View style={{ flexDirection: "row"}}>
            <Image style={{ marginTop: 3, marginRight: 5 }} source={require("../../assets/images/person.png")}/>  
            <Text> {person}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
            <Image style={{ marginTop: 3, marginRight: 5 }} source={require("../../assets/images/clock.png")}/>  
            <Text>{date}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image style={{ marginTop: 15 , width: 300, height: 435}} source={courseImage} />
      </View>
      <Text style={styles.descriptionText}>
        Untuk memberikan Anda informasi terbaru dan paling relevan mengenai
        event teknologi, saya perlu sedikit lebih spesifik tentang jenis event
        yang Anda minati. Apakah Anda mencari konferensi teknologi, pameran,
        hackathon, atau jenis event lainnya? Dan apakah ada lokasi atau waktu
        tertentu yang Anda inginkan? Ini akan membantu saya mencari informasi
        yang paling sesuai dengan kebutuhan Anda. Jika Anda mencari informasi
        umum tentang jenis-jenis event teknologi yang populer, berikut adalah
        beberapa contoh yang sering menarik perhatian banyak orang: Konferensi
        Teknologi: Event-event ini biasanya mengumpulkan pemikir, pengembang,
        dan pemimpin industri untuk membahas tren terbaru, inovasi, dan masa
        depan teknologi. Contoh populer termasuk CES (Consumer Electronics
        Show), MWC (Mobile World Congress), dan WWDC (Apple Worldwide Developers
        Conference). Hackathons: Event ini adalah kompetisi coding dimana
        pengembang, desainer, dan pengusaha berkumpul untuk menciptakan
        prototipe aplikasi atau solusi berbasis teknologi dalam jangka waktu
        yang singkat. Hackathons seringkali berfokus pada tema atau tantangan
        khusus, seperti pengembangan aplikasi untuk kesehatan atau pendidikan.
        Pameran Teknologi: Pameran ini menyajikan produk, layanan, dan inovasi
        teknologi terbaru kepada khalayak luas. Ini adalah kesempatan bagi
        perusahaan untuk menunjukkan teknologi terdepan mereka kepada konsumen
        dan investor. Contoh termasuk IFA di Berlin dan Gitex Technology Week di
        Dubai. Simposium dan Workshop: Event-event ini lebih fokus pada
        pembelajaran dan pengembangan keahlian di bidang-bidang teknologi
        tertentu. Peserta dapat menghadiri sesi pelatihan, workshop, dan seminar
        untuk meningkatkan pengetahuan dan keterampilan mereka. Pertemuan
        Komunitas dan Meetups: Event ini lebih informal dan berfokus pada
        pembangunan komunitas di sekitar teknologi atau topik tertentu. Ini
        adalah kesempatan bagi individu untuk bertukar pengetahuan, jaringan,
        dan berkolaborasi pada proyek-proyek. Webinar dan Seminar Online: Dengan
        meningkatnya akses ke internet dan teknologi komunikasi, banyak event
        teknologi kini juga tersedia secara online. Ini memungkinkan lebih
        banyak orang dari seluruh dunia untuk mengakses pembicaraan oleh pakar
        industri, pelatihan, dan panel diskusi. Setiap event teknologi memiliki
        tujuannya masing-masing, dari mendemokrasikan inovasi terbaru hingga
        memfasilitasi kolaborasi antara para profesional di bidangnya. Jika Anda
        mencari informasi lebih spesifik mengenai event tertentu, termasuk
        tanggal, lokasi, dan cara mendaftar, saya bisa membantu mencarikannya
        untuk Anda.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 15,
  },

  header: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },

  subheader: {
    fontSize: 13,
    color: "#979797",
    fontFamily: "Inter-Bold",
    paddingTop: 5,
  },

  infoSection: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  descriptionText: {
    paddingTop: 10,
    textAlign: "justify",
    fontFamily: "Inter-Regular",
  },
});

export default CourseDetails;
