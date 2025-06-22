import os
import requests
import zipfile

# Daftar URL gambar
urls = [
    "https://rfz08.my.canva.site/dageb5kydt8/images/6bdcb1111cf78fe099895a6e13c0c375.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/1060e479f74272f8b3b776660573ecf9.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/ad9b1ba4dfa6a95172c3555607230c25.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/4167e264d6d73f9bc27a758e3651565e.svg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/6dc29beb57c3615850470f3f85e5a8d8.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/25da528317385324a63cd57817c16f0f.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/edc8a7ecdf663ed6ab21b0df5c143a1f.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/da8a725b663ab5350f420863dd0550f7.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/80b4877c849a4f9d5d7fe1f09e44227d.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/074eb35b50081e8edb0900a6e96bdfe0.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/ed8d62f746f263edd51b2636afec7e04.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/cfe22eeafd993a6e7b8b254289fa7f04.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/58d045a943f4f05c9c02644e1aa5f151.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/63e06860238524ef46a5b35d5332fac5.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/9cdfb3965acedb73ce3ac53fe312941a.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/1459a1a2e59c243ab0f9b405e5330c60.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/fbfaf1dc56ea454e1773d610614ddab2.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/a4e3f41cd81cdb72fb9ed6f5d896b4ec.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/c1c2cb20cf812ea025e728587fa5480e.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/526ba88edffec056ee8be58e0d31bfff.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/50ef05bcfb6b4fa3eb92fb949764502b.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/61392d22871fd349380627e184aa13f7.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/3d33358bf6abb97a44eb260a01864441.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/521d5e1619b358e6ad664832974cfbc4.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/f83bc5233f14a4f87eb7912bca55620f.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/0d90add5147fed4f583f802a3a7156c6.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/f8f36659271263f8ac115c8faf46f06a.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/7cefbace59edb589852a5035c276aa44.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/d3d78a2eb54a55ccecdcab41a4db251b.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/34385f69503ddc1ba13c1f1b89d3726b.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/32d6988beefb44f5daf463b9b164b7a3.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/5f1f57ff3fb8065280b6cab62600e185.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/05fe342e51eddd3b0a6ada899d815ca4.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/285d1bb602bcf0c67dec30333e298fa6.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/052d27df3bb49f472d47e6be473b525e.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/995b832bfabadbbf2bdf827799d8ebc5.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/e5f8e4fe2ef7856c2e5c9fd6ba6a9793.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/186c8f5c45804f6b091f4aa76a38b5eb.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/cf341ca5518d6620d296724243bb3ec8.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/d69cd160acc59737aeab3ea11f1a0e42.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/fd5e14e3561213d667680b4fb1b20433.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/ddb29092a39df942bedc8363a57e657b.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/9da55394463b24ccf92123fd1b0e51a9.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/74043abb71769295845b9aeccc33b86e.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/65db114ec9fd3206dbf948b9b77ae910.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/36378d3733cd969ff42e26989dc33ad8.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/742fb07773bb48e4388ee9f0157d14ed.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/867f1b50bba6539c0e442e6f2e83f2c4.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/ea0810e85fd5331b45c70d59f19cb874.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/520d9c2a4259360b45dd30bcbd2800d2.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/9920fe72d6abe172e4952dbd6ee62e62.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/9920fe72d6abe172e4952dbd6ee62e62.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/1172d41c927b86ab53fc74e6d47b047b.jpg",
    "https://rfz08.my.canva.site/dageb5kydt8/images/4167e264d6d73f9bc27a758e3651565e.svg"
]

# Membuat folder sementara untuk menyimpan gambar
folder_name = "downloaded_images"
os.makedirs(folder_name, exist_ok=True)

def download_file(url, folder):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Cek jika terjadi error HTTP
        # Dapatkan nama file dari URL
        filename = url.split("/")[-1]
        # Membuat path file lengkap
        file_path = os.path.join(folder, filename)
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Berhasil mengunduh: {filename}")
        return file_path
    except Exception as e:
        print(f"Error mengunduh {url}: {e}")
        return None

# Unduh semua gambar
downloaded_files = []
for url in urls:
    filepath = download_file(url, folder_name)
    if filepath:
        downloaded_files.append(filepath)

# Membuat file ZIP dari folder yang berisi gambar
zip_filename = "images.zip"
with zipfile.ZipFile(zip_filename, 'w') as zipf:
    for file in downloaded_files:
        zipf.write(file, arcname=os.path.basename(file))

print(f"\nSemua gambar telah dikompres menjadi: {zip_filename}")
