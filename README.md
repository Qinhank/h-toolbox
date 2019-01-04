# h-toolbox
一个常用函数的封装库

# 使用

````
npm i h-toolbox -S
````

# 文档

|    名称    |                   描述                    |                             参数                             |         返回值         |
| :--------: | :---------------------------------------: | :----------------------------------------------------------: | :--------------------: |
| down2blob  | 以bolb流的类型下载数据，一般用于下载文件  | url：地址，name：文件名称，obj：{method：请求方法,data:请求参数} |          null          |
| cloneDeep  |          深拷贝，直接用lodash的           |                                                              |                        |
| queryArray |          查找指定数组中的某一值           | arr：数组，key：要查找的key值，false则为数组本身，value：要匹配的value值 |         array          |
| queryPath  |         根据url解析它的参数及地址         |                    url：不填则取当前地址                     | {path:地址,query:参数} |
| price2cny  |   将价格（数字类型）转换成中文大写类型    |                     number：要转换的价格                     |         string         |
| getBrowser |            获取当前浏览器信息             |                                                              |         object         |
| change2br  | 将数据中的回车符号转换成````<br/>````标签 |                      str：要转换的字符                       |         string         |
| saveStore  |          保存数据到localStorage           |              name：保存的名称，data：保存的数据              |                        |
|  getStore  |          获取保存的localStorage           |     name：保存的名称，times：过期时间，填false则永不过期     |          any           |

