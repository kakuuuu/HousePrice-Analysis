# HoursePrice API接口

## 技术栈

express+mysql+cheerio(爬虫)


## 在线地址

http://www.liaowang.xyz:3000/


## 用户接口列表

   
---

#### 登录

|  |  |

|:-------------:|:-------------|

| [api/userLogin](#api-userLogin) | 用户登录 |

## 用户接口详情

* #### api/userLogin

---

用户登录

##### 是否需要权限验证

---

否

##### 请求参数

---

| | 必选 | 类型 | 说明 |

|:-------------:|:-------------|:-------------|

| username | true | string | 用户名 |

| password | true | string | 密码 |

##### 请求方法

---

POST

##### 调用样例

---

` ` `
api/userLogin
` ` `

##### 返回结果

---

*** JSON示例 ***

` ` `

{

          status: 0,
					
          desc: "登录成功",
					
          data:null
					

}

` ` `

*** 错误返回值 ***

{

      status: 1,
			
      desc: "密码错误",
			
      data:null
			

}

		

关于其它错误返回值与错误代码，参见 [错误代码说明](#errorcode)

## House信息接口列表

   
---

#### 读取接口

|  |  |

|:-------------:|:-------------|

| [api/getHouseList](#api-getHouseList) | 获取楼盘信息 |

#### 更新接口

|  |  |

|:-------------:|:-------------|

| [api/updateHouse](#api-updateHouse) | 更新楼盘信息 |

## House信息接口详情

* #### api/getHouseList

---

获取楼盘信息

##### 是否需要权限验证

---

否

##### 请求参数

---

| | 必选 | 类型 | 说明 |

|:-------------:|:-------------|:-------------|

| city | true | string | 城市id |


##### 请求方法

---

GET

##### 调用样例

---

` ` `
api/getHouseList?city=hz
` ` `

##### 返回结果

---

*** JSON示例 ***

` ` `

{

data: [{city: "hz"
info: "临安临安圣园路银城青山湖畔临枫园"
lat: 30.23055806947244
lng: 119.7523039810625
number: "19000"
title: "银城青山湖畔"
unit: "元/㎡(均价)"}, …], 

desc: "成功", 

status: 0

}

` ` `

*** 错误返回值 ***

{

      status: 1,
			
      desc: "失败",
			
      data:null
			

}

		

关于其它错误返回值与错误代码，参见 [错误代码说明](#errorcode)

* #### api/getHouseList

---

更新数据库信息

##### 是否需要权限验证

---

是

##### 请求参数

---

| | 必选 | 类型 | 说明 |

|:-------------:|:-------------|:-------------|

| city | true | string | 城市id |

| username | true | string | 用户名 |

| password | true | string | 密码 |


##### 请求方法

---

POST

GET

##### 调用样例

---

` ` `

api/updateHouse?city=sh&username=admin&password=123456

` ` `

##### 返回结果

---

*** JSON示例 ***

` ` `

{

        status: 0,
				
        desc: "正在处理中",
				
        data: null

 }
` ` `

*** 错误返回值 ***

{

      status: 1, 
			
      desc: "参数错误", 
			
      data: null
    }

		

关于其它错误返回值与错误代码，参见 [错误代码说明](#errorcode)

## ErrorCode

### 错误代码对照表

---

##### 系统级错误

---

| 错误代码 | 返回msg | 详细描述 |

|:-------------:|:-------------|

| 400 | 系统错误，请稍候再试 | 请求参数有误 |

| 401 | 系统错误，请稍候再试 | 用户未登录 |

| 404 | 系统错误，请稍候再试 | 资源未找到 |

| 405 | 系统错误，请稍候再试 | 请求方法不支持 |

| 500 | 系统错误，请稍候再试 | 服务器错误 |

##### 业务级错误

---

| 错误代码 | 详细描述 |

|:-------------:|:-------------|
