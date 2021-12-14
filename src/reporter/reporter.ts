import {ContentType} from "allure-js-commons";

declare var allure: any;

export function objLog(object:object, name:string ){
    console.log(name, object);
    allure.attachment(
        name,
        JSON.stringify(object, null, 4),
        ContentType.JSON
    );
}

export async function addScreenShot(screenshot:any){
    allure.attachment("Screenshot",screenshot, "image/png")
}

export function allureStepDecorator (name:string){
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args:any) {
            const result = originalMethod.apply(this, args)
            return allure.step(name + args.toString(), ()=> {
                return result;
            })
        }
    };
}
