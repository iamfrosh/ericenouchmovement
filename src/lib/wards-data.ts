/**
 * Ward coordinators, transcribed from the movement's official LGA lists (26 September 2026).
 * Phone numbers are intentionally not included. `slug` matches the LGA document in lib/documents.ts.
 */
export interface WardEntry { name: string; ward: string }
export interface WardGroup { slug: string; lga: string; wards: WardEntry[] }

const w = (name: string, ward: string): WardEntry => ({ name, ward });

export const WARD_GROUPS: WardGroup[] = [
  { slug: "mayo-belwa", lga: "Mayo Belwa", wards: [
    w("Suleiman Yuguda", "Billa Ward"), w("Dimas Urbanus", "Ribadu Ward"), w("Kabiru Wappa", "Gengle Ward"),
    w("Hassan Salman", "Jereng Ward"), w("Linus Yusuf", "Bajama Ward"), w("Uleiman Laido", "Mayo Farang Ward"),
    w("Silvanus Edimon", "Yofur Ward"), w("Habila Denise", "Gorobi Ward"), w("Stephen Kembul", "Tola Ward"),
    w("Enoch Irimiya", "Dikon Ward"), w("Mohammed", "Ganfada Ward"), w("Apolos Simon Samani", "Binyiri Ward"),
  ] },
  { slug: "guyuk", lga: "Guyuk", wards: [
    w("Felix Raymond", "Guyuk Ward"), w("Jimjel Harrison", "Banjiram Ward"), w("Nafama Maikudi", "Bobini Ward"),
    w("Samson George", "Bodeno Ward"), w("Jimjel Shalholma", "Purokauyo Ward"), w("Gwang'wangtha Abalis Alutuson", "Dukul Ward"),
    w("Nyulanjir Sunday", "Lokoro Ward"), w("Murbuge Victor", "Chikila Ward"), w("Chudina Anthony", "Kola Ward"),
    w("Niwuna Nahum", "Dumna Ward"),
  ] },
  { slug: "lamurde", lga: "Lamurde", wards: [
    w("Manale Donald", "Waduku Ward"), w("Sony Stanley", "Rigange Ward"), w("Mugumi Simon", "Sabonlayi Ward"),
    w("John Haruna", "Lamurde Ward"), w("Yorckod Moses Damina", "Suwa Ward"), w("Pwafiyi Noel Fada", "Ngbakowo Ward"),
    w("Alphonsus Michael", "Ngbebonghe Ward"), w("Nadson Nadeino", "Gyawana Ward"), w("Filibus Hamson", "Opalo Ward"),
    w("Abednego", "Lafiya Ward"), w("Boniface Kotekamuno", "Dubwange Ward"),
  ] },
  { slug: "demsa", lga: "Demsa", wards: [
    w("David Nambitokan", "Demsa Ward"), w("Abduljalil Abubakar", "N/Demsa Ward"), w("Isaac Godwin Dada", "Kpasham Ward"),
    w("Jared Andrew", "Dilli Ward"), w("Naphtali Bille", "Bille Ward"), w("Elisha Gwamba", "Gwamba Ward"),
    w("Ndanzy Samuel Sardauna", "Mbula Ward"), w("Chris Dilli", "Borrong Ward"), w("Jude John", "Dong Ward"),
    w("Alex Sunny", "Dwam Ward"),
  ] },
  { slug: "numan", lga: "Numan", wards: [
    w("Frank Awad", "Sabon Peggi Ward"), w("Victoria Vincent", "Numan Ward 1"), w("Isaac", "Numan Ward 2"),
    w("Aliyu Abdulgadeer Kakanda", "Numan Ward 3"), w("Sapwada Benard", "Imburu Ward"), w("Malachi Gabriel Wanai", "Bare Ward"),
    w("Pwanishi Billy", "Gamadio Ward"), w("Sunday Godwin", "Kadomti Ward"), w("Coolmoon Mbasty Mbi", "Bolki Ward"),
    w("Himpiya Mbasiti", "Vulpi Ward"),
  ] },
  { slug: "shelleng", lga: "Shelleng", wards: [
    w("Jakadiya Bomu", "Shelleng Ward"), w("Gebi Ali", "Kiri Ward"), w("Yahaiya Audu", "Libbo Ward"),
    w("Ali Sulaiman", "Gundo Ward"), w("Mohammed Ahmed", "Ketembere Ward"), w("Bulus Yakubu", "Bodwai Ward"),
    w("Omega Kamstun", "Bakta Ward"), w("Maxwell Isa", "Jumbul Ward"), w("Naziru Buba", "Gwapopolok Ward"),
    w("Ayuba Dama", "Talum Ward"),
  ] },
  { slug: "toungo", lga: "Toungo", wards: [
    w("Abdulsalam Idris", "Toungo I Ward"), w("Najibu Ja'imu", "Toungo II Ward"), w("Abubakar Dauda", "Toungo III Ward"),
    w("Jason John", "Kiri I Ward"), w("Minka'ilu Njidda", "Kiri II Ward"), w("Piriwasu", "Kogin Baba I Ward"),
    w("Muktar A. Mustapha", "Kogin Baba II Ward"), w("Anthony Fibi", "Dawo I Ward"), w("Nagmeni Abdulaziz", "Dawo II Ward"),
    w("Yusuf B. Tiger", "Gumti Ward"),
  ] },
  { slug: "ganye", lga: "Ganye", wards: [
    w("Hammanjulde Musa", "Ganye 1 Ward"), w("Umar Aminu", "Ganye 2 Ward"), w("Yakubu Bulus", "Yebbi Ward"),
    w("Nasir Musa", "Bakariguso Ward"), w("Faruk Jagawe", "Sugu Ward"), w("Sunday Semeni", "Gurumpawo Ward"),
    w("Ibrahim Yahya", "Sangassumi Ward"), w("Happy Ibrahim", "Timdore Ward"), w("Sunday", "Gamu Ward"),
    w("Usman Umar", "Jaggu Ward"),
  ] },
  { slug: "jada", lga: "Jada", wards: [
    w("Audi Misawa", "Koma 1 Ward"), w("Justine Ali", "Mapeo Ward"), w("Mohammed Salihu", "Danaba Ward"),
    w("Amos Hamman", "Nybango Ward"), w("Peter Solomon", "Jada 1 Ward"), w("Victoria Emmanuel", "Jada 2 Ward"),
    w("Bilkisu Mohammed", "Mayokalaye Ward"), w("Boniface Usman", "Koma 2 Ward"), w("Alfred Kachalla", "Mbulo Ward"),
    w("Jibrailu Adiel", "Leko Ward"), w("Abdulkarim Wosi", "Yelli Ward"),
  ] },
];

export const TOTAL_WARD_COORDINATORS = WARD_GROUPS.reduce((n, g) => n + g.wards.length, 0);
