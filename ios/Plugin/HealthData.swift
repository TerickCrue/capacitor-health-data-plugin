import Foundation

@objc public class HealthData: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
