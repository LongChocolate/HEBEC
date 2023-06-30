#import <React/RCTBridgeDelegate.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <UIKit/UIKit.h>

@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate>
@property (nonatomic, strong) UIWindow *window;

@end
