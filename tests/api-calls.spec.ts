import { test, expect } from '@playwright/test';
import { executionAsyncId } from 'async_hooks';
import { console } from 'inspector';




test.beforeEach(async ({page})=>{
    
    await page.goto('https://conduit.bondaracademy.com')
})


test('Delete Article test',async ({page, request})=>{
  const response=  await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
        data:{
             
            "user": {
                    "email": "testdimitar@test.com",
                    "password": "dimitar"
                }
            
            
        }

    })
    console.log(response.status())
    expect(response.status()).toEqual(200)
    const responseBody = await response.json()
    console.log(responseBody)
    const accessToken = responseBody.user.token
    console.log(accessToken)

    //Create article

   const postResponse= await request.post('https://conduit-api.bondaracademy.com/api/articles',{
        data:{
            "article": {
                "title": "Test headline Demo",
                "description": "Test subject Demo",
                "body": "Test body Demo",
                "tagList": []
            }
           
        },
        headers:{
            Authorization: `Token ${accessToken}`
        }


        
    })

    expect(postResponse.status()).toEqual(201)

    

})



