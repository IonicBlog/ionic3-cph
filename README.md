
**添加android平台**  
    ionic cordova platform add android


**打包android平台**  
    ionic cordova build android --release --prod


**制作密钥**  
    keytool -genkey -v -keystore cn.tongedev.cph -alias cph -keyalg RSA -keysize 2048 -validity 5000

**签名**  
    jarsigner -digestalg SHA1 -sigalg MD5withRSA -keystore cn.tongedev.cph -signedjar cph-signed.apk platforms/android/build/outputs/apk/android-release-unsigned.apk cph  
