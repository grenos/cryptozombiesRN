//
//  Tokens.m
//  boilerapp
//
//  Created by Vasileios  Gkreen on 03/12/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Tokens, RCTEventEmitter)

RCT_EXTERN_METHOD(get: (NSArray *)tokens address:(NSString *)address)

@end
