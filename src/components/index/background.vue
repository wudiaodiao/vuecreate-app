<!--
 * @Author: your name
 * @Date: 2021-03-01 14:51:04
 * @LastEditTime: 2021-03-02 15:15:07
 * @LastEditors: Please set LastEditors
 * @Description: 背景
 * @FilePath: \IBMS\ibms\src\components\index\background.vue
-->

<template>
  <div>
    <section class="intro" id="home" v-if="$route.name!='2d'">
      <div class="stars"></div>
      <div class="stars2"></div>
      <div class="stars3"></div>
      <div class="meteors">
        <div class="meteor"></div>
        <div class="meteor"></div>
        <div class="meteor"></div>
        <div class="meteor"></div>
        <div class="meteor"></div>
        <div class="meteor"></div>
      </div>
      <slot></slot>
    </section>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  watch: {},
  directives: {},
  computed: {},
  mounted() {},

  destroyed() {},
  methods: {}
}
</script>

 <style >
/*GENERAL*/

/* ::-webkit-scrollbar { width: 6px; height: 6px;}
::-webkit-scrollbar-button {  background-color: #161F2A; height: 51px; }
::-webkit-scrollbar-track {  background-color: #161F2A;}
::-webkit-scrollbar-track-piece { background-color: #ffffff;}
::-webkit-scrollbar-thumb { height: 50px; background-color: #161F2A; }
::-webkit-scrollbar-corner { background-color: #9161F2A99;}}
::-webkit-resizer { background-color: #161F2A;} */

/*GENERAL ENDS*/

/*NAVBAR*/

#menu {
  position: relative;
  z-index: 1000;
}
.navbar {
  margin-bottom: 0;
}

.navbar-custom {
  background: #f2f2f2;
  border-radius: 0;
}
.icon-bar {
  background: #eee;
}

.navbar-custom a {
  color: #fff;
  transition: 0.3s;
}

.navbar-custom .nav li.active,
.navbar-custom .nav li a:hover,
.navbar-custom .nav li a:focus,
.navbar-custom .navbar-nav > li.active a {
  color: #161f2a;
  background: #eee;
}

a.navbar-brand:hover {
  color: #ccc;
}
/*NAVBAR END*/

.intro {
  min-height: 100vh;
  /* background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%); */
  overflow: hidden;
}

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1028px 626px #fff, 901px 1040px #fff, 1291px 781px #fff,
    35px 1323px #fff, 1057px 1472px #fff, 570px 760px #fff, 1981px 1998px #fff,
    1460px 1629px #fff, 416px 454px #fff, 782px 998px #fff, 1114px 561px #fff,
    817px 836px #fff, 863px 675px #fff, 1222px 1053px #fff, 1352px 864px #fff,
    1838px 1078px #fff, 1379px 522px #fff, 675px 877px #fff, 1px 442px #fff,
    950px 1794px #fff, 1397px 1914px #fff, 586px 1542px #fff, 668px 1359px #fff,
    679px 1110px #fff, 1362px 920px #fff, 1421px 67px #fff, 1394px 519px #fff,
    288px 346px #fff, 418px 370px #fff, 677px 1622px #fff, 849px 1905px #fff,
    1655px 501px #fff, 803px 1940px #fff, 1353px 1886px #fff, 1777px 1590px #fff,
    295px 1227px #fff, 93px 1747px #fff, 900px 1877px #fff, 1109px 645px #fff,
    643px 268px #fff, 823px 844px #fff, 1194px 57px #fff, 163px 793px #fff,
    405px 624px #fff, 1309px 1062px #fff, 939px 153px #fff, 1063px 1111px #fff,
    1879px 705px #fff, 1355px 275px #fff, 1912px 870px #fff, 1481px 632px #fff,
    887px 599px #fff, 1108px 659px #fff, 1915px 1758px #fff, 1675px 92px #fff,
    775px 159px #fff, 1949px 1843px #fff, 368px 331px #fff, 1520px 1048px #fff,
    1776px 435px #fff, 847px 404px #fff, 285px 1769px #fff, 809px 1112px #fff,
    1720px 189px #fff, 1459px 1080px #fff, 437px 887px #fff, 1118px 42px #fff,
    175px 1031px #fff, 1370px 1481px #fff, 108px 1042px #fff, 950px 1931px #fff,
    1957px 1393px #fff, 109px 116px #fff, 1953px 1823px #fff, 1598px 1983px #fff,
    260px 1709px #fff, 1050px 700px #fff, 991px 1064px #fff, 320px 653px #fff,
    452px 613px #fff, 1319px 723px #fff, 889px 1577px #fff, 631px 1096px #fff,
    1426px 735px #fff, 1616px 1032px #fff, 133px 1859px #fff, 592px 1802px #fff,
    528px 1951px #fff, 574px 1406px #fff, 1787px 1348px #fff, 1991px 219px #fff,
    1075px 505px #fff, 1243px 667px #fff, 198px 1139px #fff, 12px 1731px #fff,
    1772px 182px #fff, 1343px 1772px #fff, 764px 1094px #fff, 1782px 847px #fff,
    641px 115px #fff, 1152px 983px #fff, 1975px 1506px #fff, 1336px 1773px #fff,
    150px 192px #fff, 1750px 1547px #fff, 76px 87px #fff, 745px 119px #fff,
    213px 528px #fff, 1845px 1798px #fff, 562px 1921px #fff, 1086px 80px #fff,
    789px 451px #fff, 786px 377px #fff, 488px 169px #fff, 715px 883px #fff,
    106px 851px #fff, 355px 823px #fff, 908px 916px #fff, 1350px 1312px #fff,
    406px 1880px #fff, 1636px 1037px #fff, 1455px 668px #fff, 305px 800px #fff,
    1225px 1079px #fff, 1413px 1848px #fff, 1650px 858px #fff, 1339px 864px #fff,
    667px 1371px #fff, 1892px 1578px #fff, 1209px 241px #fff, 710px 1073px #fff,
    958px 1342px #fff, 736px 1284px #fff, 933px 169px #fff, 594px 1444px #fff,
    23px 1157px #fff, 1514px 1461px #fff, 1313px 1878px #fff, 445px 1349px #fff,
    421px 1770px #fff, 1654px 971px #fff, 1132px 968px #fff, 1619px 1653px #fff,
    1399px 115px #fff, 1555px 1780px #fff, 184px 263px #fff, 918px 156px #fff,
    150px 1333px #fff, 15px 1387px #fff, 282px 1468px #fff, 1451px 909px #fff,
    1357px 1410px #fff, 536px 32px #fff, 1263px 213px #fff, 974px 999px #fff,
    303px 910px #fff, 1693px 1293px #fff, 1389px 751px #fff, 1506px 1471px #fff,
    1720px 1797px #fff, 1951px 148px #fff, 93px 48px #fff, 602px 170px #fff,
    1319px 319px #fff, 295px 1467px #fff, 1096px 1403px #fff, 1691px 188px #fff,
    1063px 423px #fff, 493px 908px #fff, 655px 1718px #fff, 359px 252px #fff,
    1903px 1px #fff, 677px 917px #fff, 955px 1047px #fff, 1386px 457px #fff,
    1522px 394px #fff, 1541px 572px #fff, 211px 534px #fff, 393px 1312px #fff,
    635px 332px #fff, 1307px 437px #fff, 999px 890px #fff, 1142px 1926px #fff,
    1319px 1242px #fff, 1139px 1319px #fff, 440px 1065px #fff, 766px 1310px #fff,
    13px 135px #fff, 1478px 945px #fff, 724px 12px #fff, 105px 1532px #fff,
    781px 758px #fff, 1141px 933px #fff, 1674px 799px #fff, 1460px 42px #fff,
    1331px 58px #fff, 1116px 1894px #fff, 907px 750px #fff, 169px 1643px #fff,
    360px 1766px #fff, 1932px 1241px #fff, 918px 615px #fff, 448px 185px #fff,
    1919px 1409px #fff, 397px 706px #fff, 1774px 1215px #fff, 1529px 561px #fff,
    646px 1062px #fff, 1195px 109px #fff, 1503px 1950px #fff, 1117px 1038px #fff,
    1966px 1790px #fff, 456px 394px #fff, 1872px 341px #fff, 1986px 1045px #fff,
    1694px 1634px #fff, 706px 1687px #fff, 1596px 22px #fff, 1596px 66px #fff,
    1454px 1079px #fff, 892px 762px #fff, 1628px 901px #fff, 944px 181px #fff,
    1604px 1656px #fff, 12px 902px #fff, 306px 940px #fff, 282px 982px #fff,
    1973px 40px #fff, 1323px 1833px #fff, 527px 637px #fff, 1174px 693px #fff,
    1002px 541px #fff, 1076px 389px #fff, 1294px 839px #fff, 1788px 1755px #fff,
    347px 1335px #fff, 613px 1762px #fff, 1819px 976px #fff, 1906px 548px #fff,
    148px 523px #fff, 112px 1527px #fff, 78px 1097px #fff, 715px 1005px #fff,
    1784px 189px #fff, 1110px 626px #fff, 600px 56px #fff, 164px 34px #fff,
    93px 529px #fff, 226px 311px #fff, 533px 1621px #fff, 1474px 1147px #fff,
    1996px 261px #fff, 718px 1517px #fff, 1720px 1359px #fff, 407px 1524px #fff,
    1448px 191px #fff, 1581px 201px #fff, 1320px 823px #fff, 465px 692px #fff,
    1846px 1035px #fff, 222px 1848px #fff, 194px 1261px #fff, 1648px 254px #fff,
    1268px 1027px #fff, 444px 175px #fff, 226px 1781px #fff, 425px 1538px #fff,
    1689px 1314px #fff, 862px 751px #fff, 1926px 1716px #fff, 1550px 624px #fff,
    1863px 305px #fff, 1503px 1407px #fff, 416px 419px #fff, 1977px 844px #fff,
    197px 858px #fff, 653px 684px #fff, 1335px 241px #fff, 951px 1071px #fff,
    1246px 1632px #fff, 206px 1037px #fff, 1321px 982px #fff, 825px 612px #fff,
    1293px 909px #fff, 1293px 255px #fff, 280px 1554px #fff, 767px 145px #fff,
    1306px 1123px #fff, 1539px 1112px #fff, 1075px 746px #fff, 42px 2px #fff,
    1465px 358px #fff, 1372px 1554px #fff, 404px 1301px #fff, 1997px 432px #fff,
    1293px 495px #fff, 710px 102px #fff, 570px 1270px #fff, 1315px 466px #fff,
    1056px 307px #fff, 1510px 1527px #fff, 1349px 261px #fff, 1242px 1339px #fff,
    456px 1924px #fff, 244px 1745px #fff, 1289px 493px #fff, 1660px 1179px #fff,
    369px 1435px #fff, 409px 495px #fff, 733px 413px #fff, 1911px 856px #fff,
    601px 197px #fff, 1668px 1650px #fff, 388px 1259px #fff, 320px 1311px #fff,
    1151px 93px #fff, 502px 1606px #fff, 1589px 149px #fff, 1020px 545px #fff,
    770px 998px #fff, 1238px 1526px #fff, 875px 381px #fff, 1040px 617px #fff,
    941px 1507px #fff, 174px 856px #fff, 1726px 1244px #fff, 1223px 209px #fff,
    1734px 1417px #fff, 1099px 641px #fff, 1839px 742px #fff, 914px 238px #fff,
    924px 1447px #fff, 1888px 350px #fff, 1104px 1354px #fff, 1659px 1468px #fff,
    1301px 1917px #fff, 231px 945px #fff, 1026px 1698px #fff, 152px 1174px #fff,
    60px 372px #fff, 308px 1960px #fff, 1554px 1251px #fff, 1523px 1034px #fff,
    525px 1975px #fff, 1377px 1051px #fff, 1570px 1601px #fff, 403px 1415px #fff,
    1865px 1845px #fff, 1995px 230px #fff, 160px 592px #fff, 439px 1704px #fff,
    248px 119px #fff, 1711px 261px #fff, 464px 663px #fff, 1391px 1466px #fff,
    1683px 1904px #fff, 1249px 137px #fff, 1916px 1541px #fff, 23px 1021px #fff,
    1734px 1568px #fff, 1909px 1047px #fff, 84px 1778px #fff, 849px 1464px #fff,
    179px 442px #fff, 1156px 703px #fff, 1797px 768px #fff, 410px 1583px #fff,
    931px 1690px #fff, 1959px 111px #fff, 790px 1692px #fff, 373px 1341px #fff,
    357px 936px #fff, 402px 749px #fff, 1306px 953px #fff, 1212px 1893px #fff,
    164px 1037px #fff, 746px 852px #fff, 278px 1201px #fff, 99px 140px #fff,
    1055px 39px #fff, 1959px 663px #fff, 1344px 55px #fff, 1616px 1234px #fff,
    902px 895px #fff, 902px 1528px #fff, 635px 1823px #fff, 744px 1402px #fff,
    793px 616px #fff, 1px 638px #fff, 1626px 1169px #fff, 673px 18px #fff,
    238px 675px #fff, 798px 1281px #fff, 270px 1094px #fff, 93px 187px #fff,
    760px 994px #fff, 857px 1023px #fff, 1091px 118px #fff, 1301px 854px #fff,
    444px 395px #fff, 263px 527px #fff, 1677px 422px #fff, 526px 644px #fff,
    604px 885px #fff, 1895px 43px #fff, 1019px 1045px #fff, 1108px 1237px #fff,
    1405px 1051px #fff, 1489px 1314px #fff, 1999px 1169px #fff, 9px 1374px #fff,
    1887px 903px #fff, 1510px 564px #fff, 411px 746px #fff, 1283px 12px #fff,
    524px 1926px #fff, 778px 1657px #fff, 1323px 227px #fff, 1098px 245px #fff,
    1117px 1768px #fff, 256px 365px #fff, 983px 20px #fff, 963px 1278px #fff,
    436px 1780px #fff, 1774px 113px #fff, 943px 833px #fff, 544px 825px #fff,
    230px 1807px #fff, 625px 703px #fff, 338px 1547px #fff, 9px 247px #fff,
    1774px 1064px #fff, 1021px 1847px #fff, 1709px 1770px #fff,
    1304px 437px #fff, 1326px 1154px #fff, 353px 1759px #fff, 1630px 1157px #fff,
    628px 609px #fff, 290px 1748px #fff, 1900px 1271px #fff, 506px 1620px #fff,
    897px 785px #fff, 1632px 466px #fff, 622px 1211px #fff, 658px 896px #fff,
    970px 1655px #fff, 428px 1977px #fff, 1305px 976px #fff, 244px 344px #fff,
    1791px 209px #fff, 1048px 785px #fff, 54px 1234px #fff, 123px 1720px #fff,
    733px 1093px #fff, 62px 207px #fff, 405px 838px #fff, 835px 1597px #fff,
    559px 1872px #fff, 478px 1569px #fff, 539px 739px #fff, 1821px 1164px #fff,
    1475px 1248px #fff, 1059px 806px #fff, 1980px 130px #fff, 1339px 869px #fff,
    1527px 1110px #fff, 932px 77px #fff, 1937px 715px #fff, 169px 1908px #fff,
    1098px 1774px #fff, 469px 180px #fff, 573px 1666px #fff, 1578px 1146px #fff,
    1453px 1054px #fff, 1475px 1682px #fff, 1619px 396px #fff, 1419px 210px #fff,
    771px 1672px #fff, 1441px 1907px #fff, 976px 1949px #fff, 575px 1897px #fff,
    1801px 140px #fff, 1073px 687px #fff, 150px 1630px #fff, 1754px 268px #fff,
    1923px 972px #fff, 518px 1758px #fff, 585px 1793px #fff, 241px 608px #fff,
    804px 187px #fff, 1558px 1807px #fff, 859px 979px #fff, 897px 1468px #fff,
    1545px 1348px #fff, 404px 1675px #fff, 501px 1795px #fff, 794px 1678px #fff,
    207px 1275px #fff, 39px 952px #fff, 182px 1177px #fff, 549px 1852px #fff,
    1317px 1144px #fff, 1101px 982px #fff, 1869px 1062px #fff, 398px 1762px #fff,
    1369px 112px #fff, 1240px 950px #fff, 1836px 232px #fff, 461px 845px #fff,
    1254px 638px #fff, 1410px 523px #fff, 582px 304px #fff, 1030px 605px #fff,
    902px 1616px #fff, 1592px 1098px #fff, 1728px 115px #fff, 1107px 1474px #fff,
    389px 132px #fff, 260px 1271px #fff, 920px 3px #fff, 1167px 1292px #fff,
    1296px 1460px #fff, 1479px 1723px #fff, 1768px 580px #fff,
    1020px 1143px #fff, 941px 1821px #fff, 163px 1268px #fff, 1659px 502px #fff,
    531px 1889px #fff, 736px 1699px #fff, 1543px 599px #fff, 1509px 448px #fff,
    1656px 1571px #fff, 1533px 1957px #fff, 1123px 967px #fff, 941px 685px #fff,
    131px 1562px #fff, 627px 169px #fff, 1226px 1851px #fff, 1152px 753px #fff,
    88px 1965px #fff, 1620px 179px #fff, 869px 1629px #fff, 827px 720px #fff,
    86px 1981px #fff, 1699px 48px #fff, 1164px 471px #fff, 526px 843px #fff,
    983px 1678px #fff, 983px 1936px #fff, 1045px 1133px #fff, 1563px 1304px #fff,
    68px 17px #fff, 26px 672px #fff, 1358px 461px #fff, 1031px 57px #fff,
    933px 1414px #fff, 1391px 269px #fff, 1466px 1393px #fff, 203px 622px #fff,
    69px 1811px #fff, 892px 1075px #fff, 734px 827px #fff, 832px 431px #fff,
    685px 1521px #fff, 691px 1782px #fff, 1455px 935px #fff, 419px 1567px #fff,
    160px 1626px #fff, 16px 1561px #fff, 383px 1139px #fff, 869px 1809px #fff,
    582px 1198px #fff, 1623px 681px #fff, 1311px 68px #fff, 1429px 1243px #fff,
    906px 67px #fff, 1666px 124px #fff, 988px 1458px #fff, 792px 233px #fff,
    1581px 51px #fff, 865px 1169px #fff, 939px 945px #fff, 1471px 495px #fff,
    1105px 1845px #fff, 1px 752px #fff, 1673px 3px #fff, 966px 317px #fff,
    1255px 40px #fff, 149px 1662px #fff, 456px 1711px #fff, 200px 1099px #fff,
    156px 1351px #fff, 808px 1513px #fff, 1457px 554px #fff, 408px 1674px #fff,
    872px 441px #fff, 1077px 1409px #fff, 1238px 39px #fff, 1217px 666px #fff,
    869px 1580px #fff, 284px 538px #fff, 760px 1086px #fff, 54px 140px #fff,
    554px 1507px #fff, 749px 1326px #fff, 154px 566px #fff, 967px 1347px #fff,
    1389px 1268px #fff, 586px 1665px #fff, 1812px 1911px #fff, 927px 903px #fff,
    1587px 1853px #fff, 1984px 1367px #fff, 591px 1568px #fff, 1117px 181px #fff,
    1271px 140px #fff, 706px 1564px #fff, 1168px 535px #fff, 1344px 1139px #fff,
    1355px 1710px #fff, 341px 38px #fff, 763px 1353px #fff, 163px 640px #fff,
    45px 1297px #fff, 134px 1196px #fff, 160px 1229px #fff, 885px 281px #fff,
    909px 1787px #fff, 1884px 1863px #fff, 1140px 34px #fff, 1432px 425px #fff,
    1631px 39px #fff, 1843px 435px #fff, 571px 394px #fff, 1894px 1127px #fff,
    696px 604px #fff, 1523px 482px #fff, 714px 1011px #fff, 1661px 1893px #fff,
    1312px 1416px #fff, 1419px 1500px #fff, 1684px 1202px #fff,
    603px 1085px #fff, 134px 663px #fff, 575px 802px #fff, 631px 1164px #fff,
    241px 2000px #fff, 875px 1348px #fff, 657px 1204px #fff, 934px 772px #fff,
    1899px 1516px #fff, 1054px 1826px #fff, 552px 1270px #fff,
    1316px 1048px #fff, 869px 1365px #fff, 481px 214px #fff, 1382px 572px #fff,
    1088px 1188px #fff, 1593px 1133px #fff, 1951px 1079px #fff,
    1902px 925px #fff, 177px 919px #fff, 474px 1514px #fff, 1445px 1930px #fff,
    311px 1904px #fff, 244px 559px #fff, 751px 1813px #fff, 492px 115px #fff,
    730px 1918px #fff, 836px 145px #fff, 1497px 1133px #fff, 11px 1700px #fff,
    1023px 1335px #fff, 288px 775px #fff, 1384px 340px #fff, 46px 1042px #fff,
    545px 757px #fff, 1958px 268px #fff, 1240px 1414px #fff, 1480px 1493px #fff,
    165px 1847px #fff, 632px 37px #fff, 1196px 616px #fff, 1249px 24px #fff,
    381px 1800px #fff, 1169px 1773px #fff, 46px 181px #fff, 51px 353px #fff,
    443px 692px #fff, 644px 1316px #fff, 110px 1317px #fff, 1518px 1144px #fff,
    673px 403px #fff, 1208px 1507px #fff, 812px 1528px #fff, 1838px 1827px #fff,
    150px 39px #fff, 442px 1414px #fff;
  animation: animStar 20s linear infinite;
}
.stars:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1028px 626px #fff, 901px 1040px #fff, 1291px 781px #fff,
    35px 1323px #fff, 1057px 1472px #fff, 570px 760px #fff, 1981px 1998px #fff,
    1460px 1629px #fff, 416px 454px #fff, 782px 998px #fff, 1114px 561px #fff,
    817px 836px #fff, 863px 675px #fff, 1222px 1053px #fff, 1352px 864px #fff,
    1838px 1078px #fff, 1379px 522px #fff, 675px 877px #fff, 1px 442px #fff,
    950px 1794px #fff, 1397px 1914px #fff, 586px 1542px #fff, 668px 1359px #fff,
    679px 1110px #fff, 1362px 920px #fff, 1421px 67px #fff, 1394px 519px #fff,
    288px 346px #fff, 418px 370px #fff, 677px 1622px #fff, 849px 1905px #fff,
    1655px 501px #fff, 803px 1940px #fff, 1353px 1886px #fff, 1777px 1590px #fff,
    295px 1227px #fff, 93px 1747px #fff, 900px 1877px #fff, 1109px 645px #fff,
    643px 268px #fff, 823px 844px #fff, 1194px 57px #fff, 163px 793px #fff,
    405px 624px #fff, 1309px 1062px #fff, 939px 153px #fff, 1063px 1111px #fff,
    1879px 705px #fff, 1355px 275px #fff, 1912px 870px #fff, 1481px 632px #fff,
    887px 599px #fff, 1108px 659px #fff, 1915px 1758px #fff, 1675px 92px #fff,
    775px 159px #fff, 1949px 1843px #fff, 368px 331px #fff, 1520px 1048px #fff,
    1776px 435px #fff, 847px 404px #fff, 285px 1769px #fff, 809px 1112px #fff,
    1720px 189px #fff, 1459px 1080px #fff, 437px 887px #fff, 1118px 42px #fff,
    175px 1031px #fff, 1370px 1481px #fff, 108px 1042px #fff, 950px 1931px #fff,
    1957px 1393px #fff, 109px 116px #fff, 1953px 1823px #fff, 1598px 1983px #fff,
    260px 1709px #fff, 1050px 700px #fff, 991px 1064px #fff, 320px 653px #fff,
    452px 613px #fff, 1319px 723px #fff, 889px 1577px #fff, 631px 1096px #fff,
    1426px 735px #fff, 1616px 1032px #fff, 133px 1859px #fff, 592px 1802px #fff,
    528px 1951px #fff, 574px 1406px #fff, 1787px 1348px #fff, 1991px 219px #fff,
    1075px 505px #fff, 1243px 667px #fff, 198px 1139px #fff, 12px 1731px #fff,
    1772px 182px #fff, 1343px 1772px #fff, 764px 1094px #fff, 1782px 847px #fff,
    641px 115px #fff, 1152px 983px #fff, 1975px 1506px #fff, 1336px 1773px #fff,
    150px 192px #fff, 1750px 1547px #fff, 76px 87px #fff, 745px 119px #fff,
    213px 528px #fff, 1845px 1798px #fff, 562px 1921px #fff, 1086px 80px #fff,
    789px 451px #fff, 786px 377px #fff, 488px 169px #fff, 715px 883px #fff,
    106px 851px #fff, 355px 823px #fff, 908px 916px #fff, 1350px 1312px #fff,
    406px 1880px #fff, 1636px 1037px #fff, 1455px 668px #fff, 305px 800px #fff,
    1225px 1079px #fff, 1413px 1848px #fff, 1650px 858px #fff, 1339px 864px #fff,
    667px 1371px #fff, 1892px 1578px #fff, 1209px 241px #fff, 710px 1073px #fff,
    958px 1342px #fff, 736px 1284px #fff, 933px 169px #fff, 594px 1444px #fff,
    23px 1157px #fff, 1514px 1461px #fff, 1313px 1878px #fff, 445px 1349px #fff,
    421px 1770px #fff, 1654px 971px #fff, 1132px 968px #fff, 1619px 1653px #fff,
    1399px 115px #fff, 1555px 1780px #fff, 184px 263px #fff, 918px 156px #fff,
    150px 1333px #fff, 15px 1387px #fff, 282px 1468px #fff, 1451px 909px #fff,
    1357px 1410px #fff, 536px 32px #fff, 1263px 213px #fff, 974px 999px #fff,
    303px 910px #fff, 1693px 1293px #fff, 1389px 751px #fff, 1506px 1471px #fff,
    1720px 1797px #fff, 1951px 148px #fff, 93px 48px #fff, 602px 170px #fff,
    1319px 319px #fff, 295px 1467px #fff, 1096px 1403px #fff, 1691px 188px #fff,
    1063px 423px #fff, 493px 908px #fff, 655px 1718px #fff, 359px 252px #fff,
    1903px 1px #fff, 677px 917px #fff, 955px 1047px #fff, 1386px 457px #fff,
    1522px 394px #fff, 1541px 572px #fff, 211px 534px #fff, 393px 1312px #fff,
    635px 332px #fff, 1307px 437px #fff, 999px 890px #fff, 1142px 1926px #fff,
    1319px 1242px #fff, 1139px 1319px #fff, 440px 1065px #fff, 766px 1310px #fff,
    13px 135px #fff, 1478px 945px #fff, 724px 12px #fff, 105px 1532px #fff,
    781px 758px #fff, 1141px 933px #fff, 1674px 799px #fff, 1460px 42px #fff,
    1331px 58px #fff, 1116px 1894px #fff, 907px 750px #fff, 169px 1643px #fff,
    360px 1766px #fff, 1932px 1241px #fff, 918px 615px #fff, 448px 185px #fff,
    1919px 1409px #fff, 397px 706px #fff, 1774px 1215px #fff, 1529px 561px #fff,
    646px 1062px #fff, 1195px 109px #fff, 1503px 1950px #fff, 1117px 1038px #fff,
    1966px 1790px #fff, 456px 394px #fff, 1872px 341px #fff, 1986px 1045px #fff,
    1694px 1634px #fff, 706px 1687px #fff, 1596px 22px #fff, 1596px 66px #fff,
    1454px 1079px #fff, 892px 762px #fff, 1628px 901px #fff, 944px 181px #fff,
    1604px 1656px #fff, 12px 902px #fff, 306px 940px #fff, 282px 982px #fff,
    1973px 40px #fff, 1323px 1833px #fff, 527px 637px #fff, 1174px 693px #fff,
    1002px 541px #fff, 1076px 389px #fff, 1294px 839px #fff, 1788px 1755px #fff,
    347px 1335px #fff, 613px 1762px #fff, 1819px 976px #fff, 1906px 548px #fff,
    148px 523px #fff, 112px 1527px #fff, 78px 1097px #fff, 715px 1005px #fff,
    1784px 189px #fff, 1110px 626px #fff, 600px 56px #fff, 164px 34px #fff,
    93px 529px #fff, 226px 311px #fff, 533px 1621px #fff, 1474px 1147px #fff,
    1996px 261px #fff, 718px 1517px #fff, 1720px 1359px #fff, 407px 1524px #fff,
    1448px 191px #fff, 1581px 201px #fff, 1320px 823px #fff, 465px 692px #fff,
    1846px 1035px #fff, 222px 1848px #fff, 194px 1261px #fff, 1648px 254px #fff,
    1268px 1027px #fff, 444px 175px #fff, 226px 1781px #fff, 425px 1538px #fff,
    1689px 1314px #fff, 862px 751px #fff, 1926px 1716px #fff, 1550px 624px #fff,
    1863px 305px #fff, 1503px 1407px #fff, 416px 419px #fff, 1977px 844px #fff,
    197px 858px #fff, 653px 684px #fff, 1335px 241px #fff, 951px 1071px #fff,
    1246px 1632px #fff, 206px 1037px #fff, 1321px 982px #fff, 825px 612px #fff,
    1293px 909px #fff, 1293px 255px #fff, 280px 1554px #fff, 767px 145px #fff,
    1306px 1123px #fff, 1539px 1112px #fff, 1075px 746px #fff, 42px 2px #fff,
    1465px 358px #fff, 1372px 1554px #fff, 404px 1301px #fff, 1997px 432px #fff,
    1293px 495px #fff, 710px 102px #fff, 570px 1270px #fff, 1315px 466px #fff,
    1056px 307px #fff, 1510px 1527px #fff, 1349px 261px #fff, 1242px 1339px #fff,
    456px 1924px #fff, 244px 1745px #fff, 1289px 493px #fff, 1660px 1179px #fff,
    369px 1435px #fff, 409px 495px #fff, 733px 413px #fff, 1911px 856px #fff,
    601px 197px #fff, 1668px 1650px #fff, 388px 1259px #fff, 320px 1311px #fff,
    1151px 93px #fff, 502px 1606px #fff, 1589px 149px #fff, 1020px 545px #fff,
    770px 998px #fff, 1238px 1526px #fff, 875px 381px #fff, 1040px 617px #fff,
    941px 1507px #fff, 174px 856px #fff, 1726px 1244px #fff, 1223px 209px #fff,
    1734px 1417px #fff, 1099px 641px #fff, 1839px 742px #fff, 914px 238px #fff,
    924px 1447px #fff, 1888px 350px #fff, 1104px 1354px #fff, 1659px 1468px #fff,
    1301px 1917px #fff, 231px 945px #fff, 1026px 1698px #fff, 152px 1174px #fff,
    60px 372px #fff, 308px 1960px #fff, 1554px 1251px #fff, 1523px 1034px #fff,
    525px 1975px #fff, 1377px 1051px #fff, 1570px 1601px #fff, 403px 1415px #fff,
    1865px 1845px #fff, 1995px 230px #fff, 160px 592px #fff, 439px 1704px #fff,
    248px 119px #fff, 1711px 261px #fff, 464px 663px #fff, 1391px 1466px #fff,
    1683px 1904px #fff, 1249px 137px #fff, 1916px 1541px #fff, 23px 1021px #fff,
    1734px 1568px #fff, 1909px 1047px #fff, 84px 1778px #fff, 849px 1464px #fff,
    179px 442px #fff, 1156px 703px #fff, 1797px 768px #fff, 410px 1583px #fff,
    931px 1690px #fff, 1959px 111px #fff, 790px 1692px #fff, 373px 1341px #fff,
    357px 936px #fff, 402px 749px #fff, 1306px 953px #fff, 1212px 1893px #fff,
    164px 1037px #fff, 746px 852px #fff, 278px 1201px #fff, 99px 140px #fff,
    1055px 39px #fff, 1959px 663px #fff, 1344px 55px #fff, 1616px 1234px #fff,
    902px 895px #fff, 902px 1528px #fff, 635px 1823px #fff, 744px 1402px #fff,
    793px 616px #fff, 1px 638px #fff, 1626px 1169px #fff, 673px 18px #fff,
    238px 675px #fff, 798px 1281px #fff, 270px 1094px #fff, 93px 187px #fff,
    760px 994px #fff, 857px 1023px #fff, 1091px 118px #fff, 1301px 854px #fff,
    444px 395px #fff, 263px 527px #fff, 1677px 422px #fff, 526px 644px #fff,
    604px 885px #fff, 1895px 43px #fff, 1019px 1045px #fff, 1108px 1237px #fff,
    1405px 1051px #fff, 1489px 1314px #fff, 1999px 1169px #fff, 9px 1374px #fff,
    1887px 903px #fff, 1510px 564px #fff, 411px 746px #fff, 1283px 12px #fff,
    524px 1926px #fff, 778px 1657px #fff, 1323px 227px #fff, 1098px 245px #fff,
    1117px 1768px #fff, 256px 365px #fff, 983px 20px #fff, 963px 1278px #fff,
    436px 1780px #fff, 1774px 113px #fff, 943px 833px #fff, 544px 825px #fff,
    230px 1807px #fff, 625px 703px #fff, 338px 1547px #fff, 9px 247px #fff,
    1774px 1064px #fff, 1021px 1847px #fff, 1709px 1770px #fff,
    1304px 437px #fff, 1326px 1154px #fff, 353px 1759px #fff, 1630px 1157px #fff,
    628px 609px #fff, 290px 1748px #fff, 1900px 1271px #fff, 506px 1620px #fff,
    897px 785px #fff, 1632px 466px #fff, 622px 1211px #fff, 658px 896px #fff,
    970px 1655px #fff, 428px 1977px #fff, 1305px 976px #fff, 244px 344px #fff,
    1791px 209px #fff, 1048px 785px #fff, 54px 1234px #fff, 123px 1720px #fff,
    733px 1093px #fff, 62px 207px #fff, 405px 838px #fff, 835px 1597px #fff,
    559px 1872px #fff, 478px 1569px #fff, 539px 739px #fff, 1821px 1164px #fff,
    1475px 1248px #fff, 1059px 806px #fff, 1980px 130px #fff, 1339px 869px #fff,
    1527px 1110px #fff, 932px 77px #fff, 1937px 715px #fff, 169px 1908px #fff,
    1098px 1774px #fff, 469px 180px #fff, 573px 1666px #fff, 1578px 1146px #fff,
    1453px 1054px #fff, 1475px 1682px #fff, 1619px 396px #fff, 1419px 210px #fff,
    771px 1672px #fff, 1441px 1907px #fff, 976px 1949px #fff, 575px 1897px #fff,
    1801px 140px #fff, 1073px 687px #fff, 150px 1630px #fff, 1754px 268px #fff,
    1923px 972px #fff, 518px 1758px #fff, 585px 1793px #fff, 241px 608px #fff,
    804px 187px #fff, 1558px 1807px #fff, 859px 979px #fff, 897px 1468px #fff,
    1545px 1348px #fff, 404px 1675px #fff, 501px 1795px #fff, 794px 1678px #fff,
    207px 1275px #fff, 39px 952px #fff, 182px 1177px #fff, 549px 1852px #fff,
    1317px 1144px #fff, 1101px 982px #fff, 1869px 1062px #fff, 398px 1762px #fff,
    1369px 112px #fff, 1240px 950px #fff, 1836px 232px #fff, 461px 845px #fff,
    1254px 638px #fff, 1410px 523px #fff, 582px 304px #fff, 1030px 605px #fff,
    902px 1616px #fff, 1592px 1098px #fff, 1728px 115px #fff, 1107px 1474px #fff,
    389px 132px #fff, 260px 1271px #fff, 920px 3px #fff, 1167px 1292px #fff,
    1296px 1460px #fff, 1479px 1723px #fff, 1768px 580px #fff,
    1020px 1143px #fff, 941px 1821px #fff, 163px 1268px #fff, 1659px 502px #fff,
    531px 1889px #fff, 736px 1699px #fff, 1543px 599px #fff, 1509px 448px #fff,
    1656px 1571px #fff, 1533px 1957px #fff, 1123px 967px #fff, 941px 685px #fff,
    131px 1562px #fff, 627px 169px #fff, 1226px 1851px #fff, 1152px 753px #fff,
    88px 1965px #fff, 1620px 179px #fff, 869px 1629px #fff, 827px 720px #fff,
    86px 1981px #fff, 1699px 48px #fff, 1164px 471px #fff, 526px 843px #fff,
    983px 1678px #fff, 983px 1936px #fff, 1045px 1133px #fff, 1563px 1304px #fff,
    68px 17px #fff, 26px 672px #fff, 1358px 461px #fff, 1031px 57px #fff,
    933px 1414px #fff, 1391px 269px #fff, 1466px 1393px #fff, 203px 622px #fff,
    69px 1811px #fff, 892px 1075px #fff, 734px 827px #fff, 832px 431px #fff,
    685px 1521px #fff, 691px 1782px #fff, 1455px 935px #fff, 419px 1567px #fff,
    160px 1626px #fff, 16px 1561px #fff, 383px 1139px #fff, 869px 1809px #fff,
    582px 1198px #fff, 1623px 681px #fff, 1311px 68px #fff, 1429px 1243px #fff,
    906px 67px #fff, 1666px 124px #fff, 988px 1458px #fff, 792px 233px #fff,
    1581px 51px #fff, 865px 1169px #fff, 939px 945px #fff, 1471px 495px #fff,
    1105px 1845px #fff, 1px 752px #fff, 1673px 3px #fff, 966px 317px #fff,
    1255px 40px #fff, 149px 1662px #fff, 456px 1711px #fff, 200px 1099px #fff,
    156px 1351px #fff, 808px 1513px #fff, 1457px 554px #fff, 408px 1674px #fff,
    872px 441px #fff, 1077px 1409px #fff, 1238px 39px #fff, 1217px 666px #fff,
    869px 1580px #fff, 284px 538px #fff, 760px 1086px #fff, 54px 140px #fff,
    554px 1507px #fff, 749px 1326px #fff, 154px 566px #fff, 967px 1347px #fff,
    1389px 1268px #fff, 586px 1665px #fff, 1812px 1911px #fff, 927px 903px #fff,
    1587px 1853px #fff, 1984px 1367px #fff, 591px 1568px #fff, 1117px 181px #fff,
    1271px 140px #fff, 706px 1564px #fff, 1168px 535px #fff, 1344px 1139px #fff,
    1355px 1710px #fff, 341px 38px #fff, 763px 1353px #fff, 163px 640px #fff,
    45px 1297px #fff, 134px 1196px #fff, 160px 1229px #fff, 885px 281px #fff,
    909px 1787px #fff, 1884px 1863px #fff, 1140px 34px #fff, 1432px 425px #fff,
    1631px 39px #fff, 1843px 435px #fff, 571px 394px #fff, 1894px 1127px #fff,
    696px 604px #fff, 1523px 482px #fff, 714px 1011px #fff, 1661px 1893px #fff,
    1312px 1416px #fff, 1419px 1500px #fff, 1684px 1202px #fff,
    603px 1085px #fff, 134px 663px #fff, 575px 802px #fff, 631px 1164px #fff,
    241px 2000px #fff, 875px 1348px #fff, 657px 1204px #fff, 934px 772px #fff,
    1899px 1516px #fff, 1054px 1826px #fff, 552px 1270px #fff,
    1316px 1048px #fff, 869px 1365px #fff, 481px 214px #fff, 1382px 572px #fff,
    1088px 1188px #fff, 1593px 1133px #fff, 1951px 1079px #fff,
    1902px 925px #fff, 177px 919px #fff, 474px 1514px #fff, 1445px 1930px #fff,
    311px 1904px #fff, 244px 559px #fff, 751px 1813px #fff, 492px 115px #fff,
    730px 1918px #fff, 836px 145px #fff, 1497px 1133px #fff, 11px 1700px #fff,
    1023px 1335px #fff, 288px 775px #fff, 1384px 340px #fff, 46px 1042px #fff,
    545px 757px #fff, 1958px 268px #fff, 1240px 1414px #fff, 1480px 1493px #fff,
    165px 1847px #fff, 632px 37px #fff, 1196px 616px #fff, 1249px 24px #fff,
    381px 1800px #fff, 1169px 1773px #fff, 46px 181px #fff, 51px 353px #fff,
    443px 692px #fff, 644px 1316px #fff, 110px 1317px #fff, 1518px 1144px #fff,
    673px 403px #fff, 1208px 1507px #fff, 812px 1528px #fff, 1838px 1827px #fff,
    150px 39px #fff, 442px 1414px #fff;
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1949px 84px #fff, 1732px 1856px #fff, 734px 893px #fff,
    1963px 652px #fff, 1406px 666px #fff, 1885px 591px #fff, 1456px 751px #fff,
    1761px 1914px #fff, 1646px 304px #fff, 940px 1684px #fff, 1945px 1777px #fff,
    477px 1928px #fff, 1299px 304px #fff, 1086px 1506px #fff, 46px 1799px #fff,
    1139px 1973px #fff, 154px 530px #fff, 145px 1031px #fff, 676px 1327px #fff,
    1817px 1464px #fff, 971px 672px #fff, 414px 433px #fff, 937px 96px #fff,
    754px 462px #fff, 1589px 1237px #fff, 1097px 1204px #fff, 512px 1100px #fff,
    669px 158px #fff, 979px 69px #fff, 737px 311px #fff, 594px 508px #fff,
    406px 1019px #fff, 199px 842px #fff, 1453px 752px #fff, 818px 1235px #fff,
    1798px 1073px #fff, 289px 275px #fff, 1015px 1652px #fff, 89px 1719px #fff,
    1344px 911px #fff, 257px 1609px #fff, 377px 954px #fff, 1995px 1789px #fff,
    371px 917px #fff, 384px 905px #fff, 1827px 596px #fff, 1060px 1204px #fff,
    1259px 1449px #fff, 603px 98px #fff, 1441px 15px #fff, 575px 190px #fff,
    237px 62px #fff, 1931px 1160px #fff, 1001px 207px #fff, 1990px 1103px #fff,
    1813px 1966px #fff, 1544px 120px #fff, 842px 1041px #fff, 970px 1761px #fff,
    1692px 606px #fff, 1804px 1149px #fff, 776px 168px #fff, 1128px 227px #fff,
    1384px 707px #fff, 493px 1684px #fff, 1803px 338px #fff, 1232px 81px #fff,
    1445px 922px #fff, 969px 1524px #fff, 1748px 443px #fff, 1256px 1042px #fff,
    375px 1409px #fff, 156px 1438px #fff, 549px 1324px #fff, 831px 415px #fff,
    1119px 1200px #fff, 700px 427px #fff, 1439px 709px #fff, 410px 40px #fff,
    417px 306px #fff, 1771px 1993px #fff, 869px 128px #fff, 1415px 99px #fff,
    206px 1375px #fff, 1713px 1505px #fff, 1030px 1617px #fff,
    1674px 1487px #fff, 327px 848px #fff, 698px 1858px #fff, 1714px 1937px #fff,
    597px 1759px #fff, 1349px 1848px #fff, 854px 416px #fff, 445px 1352px #fff,
    1886px 1555px #fff, 1461px 247px #fff, 1174px 674px #fff, 391px 1991px #fff,
    1443px 154px #fff, 607px 897px #fff, 602px 439px #fff, 1929px 275px #fff,
    239px 340px #fff, 1461px 1603px #fff, 1480px 604px #fff, 1414px 1618px #fff,
    878px 111px #fff, 779px 1600px #fff, 1754px 1621px #fff, 469px 1449px #fff,
    578px 1755px #fff, 1331px 1170px #fff, 1833px 165px #fff, 307px 1347px #fff,
    1856px 700px #fff, 290px 1225px #fff, 852px 1091px #fff, 546px 768px #fff,
    435px 1087px #fff, 1135px 568px #fff, 1440px 1548px #fff, 1317px 999px #fff,
    372px 783px #fff, 749px 1518px #fff, 1679px 704px #fff, 774px 1904px #fff,
    404px 504px #fff, 1271px 632px #fff, 902px 1173px #fff, 902px 124px #fff,
    676px 1494px #fff, 1665px 632px #fff, 1307px 1412px #fff, 122px 918px #fff,
    811px 143px #fff, 1325px 1243px #fff, 303px 1765px #fff, 1204px 1949px #fff,
    1609px 776px #fff, 133px 505px #fff, 1365px 1099px #fff, 910px 1404px #fff,
    1520px 450px #fff, 882px 1767px #fff, 1204px 1838px #fff, 776px 1318px #fff,
    871px 1240px #fff, 1015px 257px #fff, 821px 1534px #fff, 115px 1746px #fff,
    1638px 356px #fff, 62px 240px #fff, 388px 513px #fff, 464px 6px #fff,
    936px 1595px #fff, 220px 960px #fff, 133px 1286px #fff, 1034px 166px #fff,
    233px 1054px #fff, 757px 1538px #fff, 347px 73px #fff, 425px 19px #fff,
    1879px 154px #fff, 545px 12px #fff, 1701px 1902px #fff, 1013px 1162px #fff,
    434px 846px #fff, 1930px 1105px #fff, 712px 1009px #fff, 342px 687px #fff,
    1483px 1204px #fff, 1613px 1837px #fff, 1658px 1212px #fff,
    1883px 366px #fff, 677px 123px #fff, 1474px 45px #fff, 1735px 1747px #fff,
    1506px 1257px #fff, 1867px 1127px #fff, 1282px 139px #fff, 112px 298px #fff,
    961px 500px #fff, 426px 1344px #fff, 266px 626px #fff, 438px 1094px #fff,
    1873px 1504px #fff, 748px 533px #fff, 810px 1231px #fff, 1446px 1px #fff,
    648px 950px #fff, 1669px 194px #fff, 432px 708px #fff, 1204px 1203px #fff,
    376px 517px #fff, 1832px 866px #fff, 544px 771px #fff, 1018px 1907px #fff,
    494px 1808px #fff, 1176px 1255px #fff, 1994px 87px #fff;
  animation: animStar 50s linear infinite;
}
.stars2:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 1949px 84px #fff, 1732px 1856px #fff, 734px 893px #fff,
    1963px 652px #fff, 1406px 666px #fff, 1885px 591px #fff, 1456px 751px #fff,
    1761px 1914px #fff, 1646px 304px #fff, 940px 1684px #fff, 1945px 1777px #fff,
    477px 1928px #fff, 1299px 304px #fff, 1086px 1506px #fff, 46px 1799px #fff,
    1139px 1973px #fff, 154px 530px #fff, 145px 1031px #fff, 676px 1327px #fff,
    1817px 1464px #fff, 971px 672px #fff, 414px 433px #fff, 937px 96px #fff,
    754px 462px #fff, 1589px 1237px #fff, 1097px 1204px #fff, 512px 1100px #fff,
    669px 158px #fff, 979px 69px #fff, 737px 311px #fff, 594px 508px #fff,
    406px 1019px #fff, 199px 842px #fff, 1453px 752px #fff, 818px 1235px #fff,
    1798px 1073px #fff, 289px 275px #fff, 1015px 1652px #fff, 89px 1719px #fff,
    1344px 911px #fff, 257px 1609px #fff, 377px 954px #fff, 1995px 1789px #fff,
    371px 917px #fff, 384px 905px #fff, 1827px 596px #fff, 1060px 1204px #fff,
    1259px 1449px #fff, 603px 98px #fff, 1441px 15px #fff, 575px 190px #fff,
    237px 62px #fff, 1931px 1160px #fff, 1001px 207px #fff, 1990px 1103px #fff,
    1813px 1966px #fff, 1544px 120px #fff, 842px 1041px #fff, 970px 1761px #fff,
    1692px 606px #fff, 1804px 1149px #fff, 776px 168px #fff, 1128px 227px #fff,
    1384px 707px #fff, 493px 1684px #fff, 1803px 338px #fff, 1232px 81px #fff,
    1445px 922px #fff, 969px 1524px #fff, 1748px 443px #fff, 1256px 1042px #fff,
    375px 1409px #fff, 156px 1438px #fff, 549px 1324px #fff, 831px 415px #fff,
    1119px 1200px #fff, 700px 427px #fff, 1439px 709px #fff, 410px 40px #fff,
    417px 306px #fff, 1771px 1993px #fff, 869px 128px #fff, 1415px 99px #fff,
    206px 1375px #fff, 1713px 1505px #fff, 1030px 1617px #fff,
    1674px 1487px #fff, 327px 848px #fff, 698px 1858px #fff, 1714px 1937px #fff,
    597px 1759px #fff, 1349px 1848px #fff, 854px 416px #fff, 445px 1352px #fff,
    1886px 1555px #fff, 1461px 247px #fff, 1174px 674px #fff, 391px 1991px #fff,
    1443px 154px #fff, 607px 897px #fff, 602px 439px #fff, 1929px 275px #fff,
    239px 340px #fff, 1461px 1603px #fff, 1480px 604px #fff, 1414px 1618px #fff,
    878px 111px #fff, 779px 1600px #fff, 1754px 1621px #fff, 469px 1449px #fff,
    578px 1755px #fff, 1331px 1170px #fff, 1833px 165px #fff, 307px 1347px #fff,
    1856px 700px #fff, 290px 1225px #fff, 852px 1091px #fff, 546px 768px #fff,
    435px 1087px #fff, 1135px 568px #fff, 1440px 1548px #fff, 1317px 999px #fff,
    372px 783px #fff, 749px 1518px #fff, 1679px 704px #fff, 774px 1904px #fff,
    404px 504px #fff, 1271px 632px #fff, 902px 1173px #fff, 902px 124px #fff,
    676px 1494px #fff, 1665px 632px #fff, 1307px 1412px #fff, 122px 918px #fff,
    811px 143px #fff, 1325px 1243px #fff, 303px 1765px #fff, 1204px 1949px #fff,
    1609px 776px #fff, 133px 505px #fff, 1365px 1099px #fff, 910px 1404px #fff,
    1520px 450px #fff, 882px 1767px #fff, 1204px 1838px #fff, 776px 1318px #fff,
    871px 1240px #fff, 1015px 257px #fff, 821px 1534px #fff, 115px 1746px #fff,
    1638px 356px #fff, 62px 240px #fff, 388px 513px #fff, 464px 6px #fff,
    936px 1595px #fff, 220px 960px #fff, 133px 1286px #fff, 1034px 166px #fff,
    233px 1054px #fff, 757px 1538px #fff, 347px 73px #fff, 425px 19px #fff,
    1879px 154px #fff, 545px 12px #fff, 1701px 1902px #fff, 1013px 1162px #fff,
    434px 846px #fff, 1930px 1105px #fff, 712px 1009px #fff, 342px 687px #fff,
    1483px 1204px #fff, 1613px 1837px #fff, 1658px 1212px #fff,
    1883px 366px #fff, 677px 123px #fff, 1474px 45px #fff, 1735px 1747px #fff,
    1506px 1257px #fff, 1867px 1127px #fff, 1282px 139px #fff, 112px 298px #fff,
    961px 500px #fff, 426px 1344px #fff, 266px 626px #fff, 438px 1094px #fff,
    1873px 1504px #fff, 748px 533px #fff, 810px 1231px #fff, 1446px 1px #fff,
    648px 950px #fff, 1669px 194px #fff, 432px 708px #fff, 1204px 1203px #fff,
    376px 517px #fff, 1832px 866px #fff, 544px 771px #fff, 1018px 1907px #fff,
    494px 1808px #fff, 1176px 1255px #fff, 1994px 87px #fff;
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1060px 1565px #fff, 90px 1636px #fff, 1418px 1127px #fff,
    1830px 1503px #fff, 399px 1354px #fff, 1402px 419px #fff, 1074px 1424px #fff,
    1823px 706px #fff, 1358px 547px #fff, 496px 791px #fff, 1451px 1015px #fff,
    1618px 1707px #fff, 1613px 211px #fff, 730px 370px #fff, 162px 442px #fff,
    228px 99px #fff, 1853px 1449px #fff, 1949px 1078px #fff, 1924px 1409px #fff,
    593px 814px #fff, 1212px 588px #fff, 1284px 1548px #fff, 1663px 927px #fff,
    1564px 89px #fff, 1730px 258px #fff, 542px 1281px #fff, 501px 987px #fff,
    1511px 815px #fff, 82px 924px #fff, 527px 1243px #fff, 902px 1360px #fff,
    513px 1785px #fff, 618px 544px #fff, 367px 1943px #fff, 1809px 877px #fff,
    60px 233px #fff, 1779px 834px #fff, 1687px 632px #fff, 994px 1962px #fff,
    913px 1422px #fff, 37px 1302px #fff, 1219px 645px #fff, 1107px 850px #fff,
    881px 1540px #fff, 1080px 210px #fff, 780px 1072px #fff, 1734px 605px #fff,
    1868px 808px #fff, 1062px 1969px #fff, 1576px 673px #fff, 465px 1862px #fff,
    1067px 1203px #fff, 1810px 173px #fff, 1883px 47px #fff, 1718px 900px #fff,
    113px 714px #fff, 1989px 536px #fff, 1453px 1699px #fff, 1101px 1070px #fff,
    1744px 595px #fff, 1791px 458px #fff, 634px 876px #fff, 1904px 701px #fff,
    1519px 1964px #fff, 245px 473px #fff, 1069px 1859px #fff, 305px 296px #fff,
    115px 1876px #fff, 535px 820px #fff, 913px 341px #fff, 133px 66px #fff,
    706px 124px #fff, 1558px 1087px #fff, 18px 930px #fff, 963px 1635px #fff,
    30px 532px #fff, 1080px 1373px #fff, 1104px 9px #fff, 298px 81px #fff,
    977px 180px #fff, 124px 1925px #fff, 1577px 602px #fff, 1677px 1183px #fff,
    128px 434px #fff, 368px 337px #fff, 1928px 867px #fff, 265px 1366px #fff,
    151px 1917px #fff, 1752px 1753px #fff, 287px 278px #fff, 795px 1263px #fff,
    1274px 1539px #fff, 1954px 806px #fff, 917px 1894px #fff, 1276px 435px #fff,
    699px 1563px #fff, 1487px 127px #fff, 886px 1749px #fff, 888px 291px #fff,
    1588px 1810px #fff;
  animation: animStar 130s linear infinite;
}
.stars3:after {
  content: ' ';
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1060px 1565px #fff, 90px 1636px #fff, 1418px 1127px #fff,
    1830px 1503px #fff, 399px 1354px #fff, 1402px 419px #fff, 1074px 1424px #fff,
    1823px 706px #fff, 1358px 547px #fff, 496px 791px #fff, 1451px 1015px #fff,
    1618px 1707px #fff, 1613px 211px #fff, 730px 370px #fff, 162px 442px #fff,
    228px 99px #fff, 1853px 1449px #fff, 1949px 1078px #fff, 1924px 1409px #fff,
    593px 814px #fff, 1212px 588px #fff, 1284px 1548px #fff, 1663px 927px #fff,
    1564px 89px #fff, 1730px 258px #fff, 542px 1281px #fff, 501px 987px #fff,
    1511px 815px #fff, 82px 924px #fff, 527px 1243px #fff, 902px 1360px #fff,
    513px 1785px #fff, 618px 544px #fff, 367px 1943px #fff, 1809px 877px #fff,
    60px 233px #fff, 1779px 834px #fff, 1687px 632px #fff, 994px 1962px #fff,
    913px 1422px #fff, 37px 1302px #fff, 1219px 645px #fff, 1107px 850px #fff,
    881px 1540px #fff, 1080px 210px #fff, 780px 1072px #fff, 1734px 605px #fff,
    1868px 808px #fff, 1062px 1969px #fff, 1576px 673px #fff, 465px 1862px #fff,
    1067px 1203px #fff, 1810px 173px #fff, 1883px 47px #fff, 1718px 900px #fff,
    113px 714px #fff, 1989px 536px #fff, 1453px 1699px #fff, 1101px 1070px #fff,
    1744px 595px #fff, 1791px 458px #fff, 634px 876px #fff, 1904px 701px #fff,
    1519px 1964px #fff, 245px 473px #fff, 1069px 1859px #fff, 305px 296px #fff,
    115px 1876px #fff, 535px 820px #fff, 913px 341px #fff, 133px 66px #fff,
    706px 124px #fff, 1558px 1087px #fff, 18px 930px #fff, 963px 1635px #fff,
    30px 532px #fff, 1080px 1373px #fff, 1104px 9px #fff, 298px 81px #fff,
    977px 180px #fff, 124px 1925px #fff, 1577px 602px #fff, 1677px 1183px #fff,
    128px 434px #fff, 368px 337px #fff, 1928px 867px #fff, 265px 1366px #fff,
    151px 1917px #fff, 1752px 1753px #fff, 287px 278px #fff, 795px 1263px #fff,
    1274px 1539px #fff, 1954px 806px #fff, 917px 1894px #fff, 1276px 435px #fff,
    699px 1563px #fff, 1487px 127px #fff, 886px 1749px #fff, 888px 291px #fff,
    1588px 1810px #fff;
}

.meteors {
  position: relative;
  width: 100%;
}

.meteor {
  position: absolute;
  top: 50px;
  left: 280px;
  width: 300px;
  height: 1px;
  -webkit-transform: rotate(-45deg);
  background-image: -webkit-linear-gradient(
    left,
    white,
    rgba(255, 255, 255, 0)
  );
}
.meteor:before {
  content: ' ';
  position: absolute;
  width: 4px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 14px 4px white;
  margin-top: -2px;
}
.meteor:nth-child(1) {
  top: 100px;
  left: 20%;
  -webkit-animation: meteor 8s linear infinite;
}
.meteor:nth-child(2) {
  top: 200px;
  left: 40%;
  -webkit-animation: meteor 12s linear infinite;
}
.meteor:nth-child(3) {
  top: 250px;
  left: 60%;
  -webkit-animation: meteor 16s linear infinite;
}
.meteor:nth-child(4) {
  top: 250px;
  left: 80%;
  -webkit-animation: meteor 20s linear infinite;
}
.meteor:nth-child(5) {
  top: 250px;
  left: 70%;
  -webkit-animation: meteor 11s linear infinite;
}
.meteor:nth-child(6) {
  top: 250px;
  left: 50%;
  -webkit-animation: meteor 7s linear infinite;
}
@-webkit-keyframes meteor {
  0% {
    margin-top: -300px;
    margin-right: -300px;
    opacity: 1;
  }
  8% {
    opacity: 0;
  }
  10% {
    margin-top: 300px;
    margin-left: -600px;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>
