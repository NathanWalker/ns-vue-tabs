import SwiftUI
import UIKit

struct TabsAccessoryContent: View {
  var body: some View {
    GeometryReader { proxy in
      let isCompact = proxy.size.width < 260
      VStack {
        Spacer(minLength: 0)

        HStack(spacing: 12) {
          // Leading icon
          ZStack {
            RoundedRectangle(cornerRadius: 8, style: .continuous)
              .fill(Color.white)
            Image("icon3")
              .resizable()
              .scaledToFit()
              .padding(4)
          }
          .frame(width: 28, height: 28)

          // Text stack
          VStack(alignment: .leading, spacing: 2) {
            Text("Designing Liquid Glass Accessory...")
              .font(.system(size: 12, weight: .semibold))
              .lineLimit(1)
              .truncationMode(.tail)
              .layoutPriority(1)

            Text("NativeScript is pretty cool")
              .font(.system(size: 10))
              .foregroundColor(Color(UIColor.secondaryLabel))
              .lineLimit(1)
              .truncationMode(.tail)
          }

          Spacer(minLength: 8)

          // Trailing icons
          HStack(spacing: 10) {
            Image(systemName: "stop.fill")
              .imageScale(.small)
            if !isCompact {
              Image(systemName: "ellipsis")
                .imageScale(.small)
            }
          }
          .foregroundColor(.white)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 10)
        .background(
          .ultraThinMaterial,
          in: RoundedRectangle(cornerRadius: 18, style: .continuous)
        )
        .overlay(
          RoundedRectangle(cornerRadius: 18, style: .continuous)
            .strokeBorder(.white.opacity(0.22), lineWidth: 0.8)
        )
        .shadow(
          color: .black.opacity(0.20),
          radius: 16,
          x: 0,
          y: 8
        )
        .contentShape(RoundedRectangle(cornerRadius: 18, style: .continuous))

        Spacer(minLength: 0)
      }
      .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
  }
}

@objc(TabsAccessoryView)
class TabsAccessoryView: UIView {
  private var hostingController: UIHostingController<TabsAccessoryContent>?

  override init(frame: CGRect) {
    super.init(frame: frame)
    commonInit()
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    commonInit()
  }

  private func commonInit() {
    let content = TabsAccessoryContent()
    let hosting = UIHostingController(rootView: content)
    hosting.view.translatesAutoresizingMaskIntoConstraints = false

    addSubview(hosting.view)

    // Pin hosted SwiftUI view to our safe area/bounds
    NSLayoutConstraint.activate([
      hosting.view.leadingAnchor.constraint(equalTo: safeAreaLayoutGuide.leadingAnchor),
      hosting.view.trailingAnchor.constraint(equalTo: safeAreaLayoutGuide.trailingAnchor),
      hosting.view.topAnchor.constraint(equalTo: topAnchor),
      hosting.view.bottomAnchor.constraint(equalTo: bottomAnchor),
    ])

    backgroundColor = .clear
    hosting.view.backgroundColor = .clear

    // Allow horizontal shrink/expand as tab bar transitions
    hosting.view.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
    hosting.view.setContentHuggingPriority(.defaultLow, for: .horizontal)

    self.hostingController = hosting
  }
}
