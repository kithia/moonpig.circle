import { Image as ExpoImage } from 'expo-image';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FlowStep = 'basket' | 'about' | 'circle' | 'message' | 'matched' | 'result';

const BLUE = '#0054c8';
const BLUE_SOFT = '#eaf1ff';
const INK = '#00204d';
const PINK = '#d64f7e';
const PINK_SOFT = '#fde8ef';
const GREY = '#5f5f5f';
const LINE = '#e7e7e7';
const CARD = '#ffffff';
const BACKGROUND = '#f7f8fa';

const steps: FlowStep[] = ['basket', 'about', 'circle', 'message', 'matched', 'result'];
const progressSteps: FlowStep[] = ['about', 'circle', 'message'];

function Header({ step }: { step: FlowStep }) {
  const isBasket = step === 'basket';
  const basketIcon = step === 'matched'
    ? require('../../assets/designs/Basket(2).svg')
    : require('../../assets/designs/Basket(1).svg');
  const progressIndex = progressSteps.indexOf(step);
  const showProgress = progressIndex !== -1;
  const progress = ((progressIndex + 1) / progressSteps.length) * 100;

  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Text style={styles.menu}>☰</Text>
        <ExpoImage source={require('../../assets/designs/Moonpig.svg')} style={styles.logo} contentFit="contain" />
        <View style={styles.headerActions}>
          <ExpoImage source={require('../../assets/designs/Calendar.svg')} style={styles.headerActionIcon} contentFit="contain" />
          <ExpoImage source={basketIcon} style={styles.headerActionIcon} contentFit="contain" />
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchText}>Search...</Text>
      </View>
      {showProgress && (
        <View style={styles.progressTrack}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
      )}
    </View>
  );
}

function PrimaryButton({ children, onPress, disabled = false, mutedDisabled = false }: { children: string; onPress?: () => void; disabled?: boolean; mutedDisabled?: boolean }) {
  if (disabled) {
    return (
      <Pressable onPress={() => undefined} accessibilityState={{ disabled: true }} style={({ pressed }) => [styles.primaryButton, styles.primaryButtonDisabled, mutedDisabled && styles.primaryButtonMuted, pressed && styles.pressed]}>
        <Text style={styles.primaryButtonText}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress ?? (() => undefined)} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
      <Text style={styles.primaryButtonText}>{children}</Text>
    </Pressable>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={12}>
      <Text style={styles.back}>← Back</Text>
    </Pressable>
  );
}

function CardArt({ small = false, alt = false }: { small?: boolean; alt?: boolean }) {
  return (
    <View style={[styles.cardArt, small && styles.cardArtSmall, alt && styles.cardArtAlt]}>
      <Text style={styles.cardArtLabel}>CIRCLE FRIEND</Text>
      <Text style={styles.cardArtFlower}>{alt ? '✦' : '✿'}</Text>
      <Text style={styles.cardArtLine}>A little kindness</Text>
    </View>
  );
}

function Screen({ children, eyebrow, title, onBack }: { children: React.ReactNode; eyebrow?: string; title: string; onBack?: () => void }) {
  return (
    <View style={styles.screen}>
      {onBack && <BackButton onPress={onBack} />}
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

function Basket({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.basketScreen}>
      <View style={styles.basketHeaderRow}>
        <Text style={styles.sectionHeading}>Basket</Text>
        <Text style={styles.itemCount}>1 item</Text>
      </View>

      <View style={styles.basketItem}>
        <View style={styles.cardThumbWrap}>
          <Image
            source={require('../../assets/designs/Basket/Harry Potter.jpg')}
            resizeMode="cover"
            style={styles.cardThumb}
          />
        </View>
        <View style={styles.itemCopy}>
          <Text style={styles.itemTitle}>Happy Potter Birthday Card</Text>
          <Text style={styles.muted}>To: Sarah</Text>
          <Text style={styles.muted}>Standard delivery · 1st Class</Text>
          <View style={styles.itemMetaRow}>
            <Text style={[styles.price, styles.itemPrice]}>£6.99</Text>
            <Text style={styles.inlineLink}>Edit</Text>
            <Text style={styles.inlineLink}>Remove</Text>
          </View>
        </View>
      </View>

      <View style={styles.total}>
        <View style={styles.totalRow}>
          <Text style={styles.muted}>Items total</Text>
          <Text style={styles.price}>£6.99</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.muted}>Postage costs</Text>
          <Text style={styles.muted}>Calculated at checkout</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>£6.99</Text>
        </View>
      </View>

      <PrimaryButton disabled>Checkout</PrimaryButton>

      <View style={styles.promoCard}>
        <Text style={styles.promoTag}>Moonpig Circle</Text>
        <Text style={styles.promoText}>Send a surprise card to a stranger through Moonpig Circle</Text>
        <View style={styles.promoActions}>
          <Text style={styles.secondaryActionText}>Optional add-on</Text>
          <Pressable style={styles.promoButton} onPress={onNext}>
            <Text style={styles.promoButtonText}>Add Circle card</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.recommendationsHeading}>Your gift recommendations</Text>
      <View style={styles.recommendationRow}>
        <View style={styles.gift}>
          <View style={styles.giftThumb} />
          <Text style={styles.giftName}>{`LEGO Flying
Ford`}</Text>
        </View>
        <View style={styles.gift}>
          <View style={styles.giftThumb} />
          <Text style={styles.giftName}>{`LEGO
Hedwig™ at`}</Text>
        </View>
        <View style={styles.gift}>
          <View style={styles.giftThumb} />
          <Text style={styles.giftName}>{`Harry Pot
26cm Sc`}</Text>
        </View>
      </View>

      <View style={styles.plusCard}>
        <View style={styles.plusHeader}>
          <Text style={styles.plusBadge}>Moonpig Plus</Text>
          <Text style={styles.plusPrice}>From £6.99/mo</Text>
        </View>
        <Text style={styles.plusTitle}>Enjoy free delivery and exclusive member benefits</Text>
        <Text style={styles.plusMeta}>Cancel anytime</Text>
        <Pressable style={styles.plusButton}>
          <Text style={styles.plusButtonText}>Join Moonpig Plus</Text>
        </Pressable>
      </View>

      <Pressable style={styles.discountRow}>
        <Text style={styles.discountText}>Add a discount code</Text>
        <Text style={styles.discountChevron}>›</Text>
      </Pressable>

      <View style={styles.total}>
        <View style={styles.totalRow}>
          <Text style={styles.muted}>Items total</Text>
          <Text style={styles.price}>£6.99</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.muted}>Postage costs</Text>
          <Text style={styles.muted}>Calculated at checkout</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalLabel}>£6.99</Text>
        </View>
      </View>

      <PrimaryButton disabled>Checkout</PrimaryButton>
    </View>
  );
}

function About({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [isGuidelinesAccepted, setGuidelinesAccepted] = useState(false);

  return (
    <Screen onBack={onBack} eyebrow="Step 1 of 3" title="About Moonpig Circle">
      <Text style={styles.body}>
        A small act of kindness can make someone&apos;s day. Moonpig Circle matches people who
        want to send a card with someone who needs a little cheer.
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <ExpoImage source={require('../../assets/designs/About Moonpig Circle/Lock-icon.svg')} style={styles.infoIcon} contentFit="contain" />
          <View style={styles.infoCopy}>
            <Text style={styles.infoTitle}>A card with a purpose</Text>
            <Text style={styles.muted}>Your card will be sent anonymously to someone in the community.</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <ExpoImage source={require('../../assets/designs/About Moonpig Circle/Cross-icon.svg')} style={styles.infoIcon} contentFit="contain" />
          <View style={styles.infoCopy}>
            <Text style={styles.infoTitle}>No personal details shared</Text>
            <Text style={styles.muted}>Keep your connection kind, private, and anonymous.</Text>
          </View>
        </View>
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isGuidelinesAccepted }}
        onPress={() => setGuidelinesAccepted((accepted) => !accepted)}
        style={styles.checkRow}
      >
        <Text style={[styles.checkbox, isGuidelinesAccepted && styles.checkboxChecked]}>{isGuidelinesAccepted ? '✓' : ''}</Text>
        <Text style={styles.muted}>I agree to the Circle guidelines</Text>
      </Pressable>

      <View style={styles.aboutActions}>
        <Pressable onPress={onBack} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Not now</Text>
        </Pressable>
        <View style={styles.aboutContinue}>
          <PrimaryButton onPress={onNext} disabled={!isGuidelinesAccepted} mutedDisabled>
            Continue
          </PrimaryButton>
        </View>
      </View>
    </Screen>
  );
}

function ChooseCard({ onNext, onBack, onBasket }: { onNext: (cardImage: number) => void; onBack: () => void; onBasket: () => void }) {
  const [selectedCard, setSelectedCard] = useState(0);
  const cards = [
    { title: 'Christmas Cheer', image: require('../../assets/designs/Choose your Circle card/Christmas Cheer.png') },
    { title: 'Winter Wishes', image: require('../../assets/designs/Choose your Circle card/Winter Wishes.png') },
    { title: 'Sunshine Holiday', image: require('../../assets/designs/Choose your Circle card/Sunshine Holiday.png') },
    { title: 'Postcard from Away', image: require('../../assets/designs/Choose your Circle card/Postcard from Away.png') },
  ];

  return (
    <Screen onBack={onBack} eyebrow="Step 2 of 3" title="Choose your Circle card">
      <Text style={styles.body}>Select a friendly card template. All cards are pre-designed curated illustrations</Text>

      <View style={styles.cardGrid}>
        {cards.map((card, index) => {
          const isSelected = selectedCard === index;

          return (
            <Pressable
              key={card.title}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelectedCard(index)}
              style={[styles.cardOption, isSelected && styles.cardOptionSelected]}
            >
              <ExpoImage source={card.image} style={styles.circleCardImage} contentFit="cover" />
              <Text style={styles.circleCardTitle}>{card.title}</Text>
              {isSelected && (
                <View style={styles.cardSelectedBadge}>
                  <Text style={styles.cardSelectedTick}>✓</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <Pressable onPress={onBasket} style={styles.fullWidthSecondaryButton}>
        <Text style={styles.secondaryButtonText}>Not now</Text>
      </Pressable>
      <PrimaryButton onPress={() => onNext(cards[selectedCard].image)}>Continue</PrimaryButton>
        <View style={styles.cardDisclaimerRow}>
          <ExpoImage source={require('../../assets/designs/Choose your Circle card/info.svg')} style={styles.cardDisclaimerIcon} contentFit="contain" />
          <Text style={styles.cardDisclaimer}>Curated illustrations only - no photo uploads.</Text>
        </View>
    </Screen>
  );
}

function WriteMessage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [message, setMessage] = useState('Sending you a little sunshine today. I hope this card brings a smile to your face.');

  return (
    <Screen onBack={onBack} eyebrow="Step 3 of 3" title="Write your message">
      <Text style={styles.body}>Select a friendly card template. All cards are pre-designed curated illustrations.</Text>
      <View style={styles.recipientRow}>
        <ExpoImage source={require('../../assets/designs/Write your message/circle-x.svg')} style={styles.recipientIcon} contentFit="contain" />
        <Text style={[styles.label, styles.recipientLabel]}>To: Someone in the North West</Text>
        <View style={styles.messageStamp}>
          <ExpoImage source={require('../../assets/designs/Write your message/badge-check.svg')} style={styles.messageStampIcon} contentFit="contain" />
          <Text style={styles.messageStampText}>CIRCLE STAMP</Text>
        </View>
      </View>

      <View style={styles.messageBox}>
        <TextInput
          accessibilityLabel="Message"
          multiline
          maxLength={250}
          onChangeText={setMessage}
          placeholder="Write something kind..."
          placeholderTextColor="#8a93a3"
          style={styles.messageTextInput}
          textAlignVertical="top"
          value={message}
        />
        <View style={styles.messageFooter}>
          <Text style={styles.messageHint}>Keep it safe and warm</Text>
          <Text style={styles.counter}>{message.length} / 250</Text>
        </View>
      </View>

      <View style={styles.notice}>
        <ExpoImage source={require('../../assets/designs/Write your message/shield.svg')} style={styles.disclaimerIcon} contentFit="contain" />
        <View style={styles.disclaimerCopy}>
          <Text style={styles.noticeTitle}>Safe communication</Text>
          <Text style={styles.muted}>To keep everyone safe, contact details, social media handles and address indicators can't be shared.</Text>
        </View>
      </View>

      <View style={styles.blockedNotice}>
        <ExpoImage source={require('../../assets/designs/Write your message/alert-triangle.svg')} style={styles.disclaimerIcon} contentFit="contain" />
        <View style={styles.disclaimerCopy}>
          <Text style={styles.blockedNoticeTitle}>BLOCKED</Text>
          <Text style={styles.blockedNoticeText}>Messages containing phoone numbers or social media handles will not be sent.</Text>
        </View>
      </View>

      <PrimaryButton onPress={onNext}>Send card</PrimaryButton>
    </Screen>
  );
}

function Matched({ cardImage, onCheckout }: { cardImage: number; onCheckout: () => void }) {
  return (
    <View style={styles.circleBasketScreen}>
      <View style={styles.circleAddedBanner}>
        <ExpoImage source={require('../../assets/designs/Basket with Circle Card/check.svg')} style={styles.circleAddedIcon} contentFit="contain" />
        <Text style={styles.circleAddedText}>Circle card added to your basket</Text>
      </View>

      <View style={styles.circleBasketHeaderRow}>
        <Text style={styles.sectionHeading}>Basket</Text>
        <Text style={styles.itemCount}>2 items</Text>
      </View>

      <View style={styles.circleBasketItem}>
        <View style={styles.cardThumbWrap}>
          <Image source={require('../../assets/designs/Basket/Harry Potter.jpg')} resizeMode="cover" style={styles.cardThumb} />
        </View>
        <View style={styles.itemCopy}>
          <Text style={styles.itemTitle}>Harry Potter Birthday Card</Text>
          <Text style={styles.muted}>To: Sarah</Text>
          <Text style={styles.muted}>Standard delivery · 1st Class</Text>
          <View style={styles.itemMetaRow}>
            <Text style={[styles.price, styles.itemPrice]}>£6.99</Text>
            <Text style={styles.inlineLink}>Edit</Text>
            <Text style={styles.inlineLink}>Remove</Text>
          </View>
        </View>
      </View>

      <View style={styles.circleBasketItem}>
        <View style={styles.cardThumbWrap}>
          <ExpoImage source={cardImage} resizeMode="cover" style={styles.cardThumb} contentFit="cover" />
        </View>
        <View style={styles.itemCopy}>
          <View style={styles.circleStamp}>
            <ExpoImage source={require('../../assets/designs/Basket with Circle Card/badge-check.svg')} style={styles.circleStampIcon} contentFit="contain" />
            <Text style={styles.circleStampText}>CIRCLE STAMP</Text>
          </View>
          <Text style={styles.itemTitle}>Moonpig Circle card</Text>
          <Text style={styles.muted}>Surprise card to a stranger</Text>
          <View style={styles.itemMetaRow}>
            <Text style={[styles.price, styles.itemPrice]}>£4.99</Text>
            <Text style={styles.inlineLink}>Remove</Text>
          </View>
        </View>
      </View>

      <View style={styles.deliverySelector}>
        <Text style={styles.deliveryTitle}>Delivery</Text>
        <View style={styles.deliveryOption}>
          <View style={styles.deliveryCheck}><Text style={styles.deliveryCheckText}>✓</Text></View>
          <View style={styles.deliveryCopy}>
            <Text style={styles.deliveryOptionTitle}>Standard delivery</Text>
            <Text style={styles.muted}>Calculated at checkout</Text>
          </View>
          <Text style={styles.deliveryChevron}>›</Text>
        </View>
        <View style={styles.total}>
          <View style={styles.totalRow}><Text style={styles.muted}>Items total</Text><Text style={styles.price}>£11.98</Text></View>
          <View style={styles.totalRow}><Text style={styles.muted}>Postage costs</Text><Text style={styles.muted}>Calculated at checkout</Text></View>
          <View style={styles.summaryRule} />
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalLabel}>£11.98</Text></View>
        </View>
      </View>

      <Pressable style={styles.circleDiscountRow}>
        <Text style={styles.discountText}>Add a discount code</Text>
        <Text style={styles.discountChevron}>›</Text>
      </Pressable>

      <PrimaryButton onPress={onCheckout}>Checkout</PrimaryButton>
    </View>
  );
}

function Result({ onBack, cardImage }: { onBack: () => void; cardImage: number }) {
  return (
    <View style={styles.orderSummaryScreen}>
      <View style={styles.orderSummaryBanner}>
        <View style={styles.orderSummaryBannerIconWrap}>
          <ExpoImage source={require('../../assets/designs/Order confirmation/mail-open.svg')} style={styles.orderSummaryBannerIcon} contentFit="contain" />
        </View>
        <Text style={styles.orderSummaryBannerTitle}>Your circle card</Text>
      </View>

      <View style={styles.orderSummaryContent}>
        <View style={styles.senderRow}>
          <ExpoImage source={require('../../assets/designs/Order confirmation/mail-open.svg')} style={styles.senderIcon} contentFit="contain" />
          <Text style={styles.senderText}>From: Maya, The North West</Text>
        </View>

        <Text style={styles.circleLabel}>Moonpig Circle</Text>

        <ExpoImage source={cardImage} style={styles.orderSummaryCardImage} contentFit="cover" />

        <View style={styles.messageSummaryBox}>
          <Text style={styles.messageSummaryText}>Hi friend! I'm sending cozy rays of happiness from rainy Lancashire. I hope this card brings a smile to your face today. Remember you are appreciated!</Text>
          <View style={styles.messageSummaryFooter}>
            <Text style={styles.messageSummaryFooterText}>Sent safely through Circle Stamp Post</Text>
            <ExpoImage source={require('../../assets/designs/Order confirmation/shield-check.svg')} style={styles.messageSummaryBadge} contentFit="contain" />
          </View>
        </View>

        <View style={styles.orderSummaryDisclaimer}>
          <ExpoImage source={require('../../assets/designs/Order confirmation/help-circle.svg')} style={styles.orderSummaryInfoIcon} contentFit="contain" />
          <Text style={styles.orderSummaryDisclaimerText}>Direct messaging is not available - replies are sent as cards.</Text>
        </View>

        <Pressable onPress={() => undefined} style={styles.anonymousReplyButton}>
          <Text style={styles.anonymousReplyButtonText}>Send an Anonymous Reply</Text>
        </Pressable>
        <View style={styles.resultActions}>
          <Text style={styles.resultActionText}>Report Card</Text>
          <View style={styles.resultActionDivider} />
          <Text style={styles.resultActionText}>Block Member</Text>
        </View>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [step, setStep] = useState<FlowStep>('basket');
  const [selectedCircleCard, setSelectedCircleCard] = useState<number>(require('../../assets/designs/Choose your Circle card/Christmas Cheer.png'));
  const next = () => setStep(steps[Math.min(steps.indexOf(step) + 1, steps.length - 1)]);
  const previous = () => setStep(steps[Math.max(steps.indexOf(step) - 1, 0)]);
  const chooseCircleCard = (cardImage: number) => {
    setSelectedCircleCard(cardImage);
    next();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Header step={step} />
        {step === 'basket' && <Basket onNext={next} />}
        {step === 'about' && <About onNext={next} onBack={previous} />}
        {step === 'circle' && <ChooseCard onNext={chooseCircleCard} onBack={previous} onBasket={() => setStep('basket')} />}
        {step === 'message' && <WriteMessage onNext={next} onBack={previous} />}
        {step === 'matched' && <Matched cardImage={selectedCircleCard} onCheckout={next} />}
        {step === 'result' && <Result onBack={previous} cardImage={selectedCircleCard} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    paddingBottom: 32,
    backgroundColor: BACKGROUND,
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: LINE,
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  statusText: {
    color: INK,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    color: INK,
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Moonpig-Regular',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 36,
    position: 'relative',
  },
  menu: {
    fontSize: 25,
    lineHeight: 25,
    color: INK,
    width: 30,
    fontFamily: 'Moonpig-Regular',
  },
  logo: {
    position: 'absolute',
    width: 96,
    height: 32,
    left: '50%',
    marginLeft: -48,
  },
  headerActions: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerActionIcon: {
    width: 36,
    height: 36,
  },
  headerIcon: {
    color: INK,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Moonpig-Regular',
  },
  searchWrap: {
    marginTop: 12,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: BLUE,
    backgroundColor: '#edf4ff',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  searchText: {
    color: '#6b7b9c',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  progressTrack: {
    marginTop: 12,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#f0eaf4',
    overflow: 'hidden',
  },
  progress: {
    height: 4,
    borderRadius: 4,
    backgroundColor: BLUE,
  },
  screen: {
    paddingHorizontal: 20,
    paddingTop: 22,
    gap: 14,
  },
  back: {
    color: BLUE,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  eyebrow: {
    color: GREY,
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    fontFamily: 'Moonpig-Bold',
    marginTop: 4,
  },
  title: {
    color: INK,
    fontSize: 33,
    lineHeight: 38,
    letterSpacing: -0.7,
    fontFamily: 'Moonpig-Bold',
  },
  body: {
    color: '#4a5366',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Moonpig-Regular',
  },
  basketScreen: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 14,
  },
  circleBasketScreen: {
    backgroundColor: BACKGROUND,
    gap: 0,
    paddingBottom: 24,
  },
  circleAddedBanner: {
    backgroundColor: '#ebfdf5',
    minHeight: 41,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#10794f',
  },
  circleAddedIcon: {
    width: 18,
    height: 18,
  },
  circleAddedText: {
    color: '#10794f',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  circleBasketItem: {
    backgroundColor: '#fff',
    minHeight: 122,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  deliverySelector: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  deliveryTitle: {
    color: INK,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  deliveryOption: {
    borderWidth: 2,
    borderColor: BLUE,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deliveryCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryCheckText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  deliveryCopy: {
    flex: 1,
    gap: 2,
  },
  deliveryOptionTitle: {
    color: INK,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  deliveryChevron: {
    color: BLUE,
    fontSize: 24,
    lineHeight: 24,
    fontFamily: 'Moonpig-Regular',
  },
  circleDiscountRow: {
    backgroundColor: '#fff',
    minHeight: 42,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  circleBasketPromo: {
    backgroundColor: PINK_SOFT,
    margin: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#c22f50',
    borderRadius: 8,
    gap: 8,
  },
  circleBasketPromoTitle: {
    alignSelf: 'flex-start',
    backgroundColor: '#f9c406',
    color: INK,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 7,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  circleBasketPromoBody: {
    color: INK,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Moonpig-Bold',
  },
  circleBasketPromoText: {
    color: INK,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Moonpig-Regular',
  },
  circleBasketSummary: {
    backgroundColor: '#fff',
    marginTop: -2,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LINE,
  },
  summaryRule: {
    height: 1,
    backgroundColor: LINE,
    marginVertical: 2,
  },
  circleBasketBack: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  basketHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  circleBasketHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionHeading: {
    color: INK,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Moonpig-Bold',
  },
  itemCount: {
    color: GREY,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  basketItem: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#ebedf1',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardThumbWrap: {
    width: 88,
    height: 88,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 14,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#eceef2',
  },
  cardThumb: {
    width: '100%',
    height: '100%',
  },
  itemCopy: {
    flex: 1,
    gap: 4,
  },
  itemTitle: {
    color: INK,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  circleStamp: {
    alignSelf: 'flex-start',
    backgroundColor: BLUE_SOFT,
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  circleStampIcon: {
    width: 12,
    height: 12,
  },
  circleStampText: {
    color: BLUE,
    fontSize: 11,
    lineHeight: 14,
    fontFamily: 'Moonpig-Bold',
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  itemPrice: {
    flex: 1,
  },
  muted: {
    color: GREY,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  price: {
    color: INK,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  inlineLink: {
    color: BLUE,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  promoCard: {
    backgroundColor: '#fde8ee',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d8627d',
    padding: 14,
    gap: 12,
  },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7cf31',
    color: INK,
    fontSize: 15,
    lineHeight: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontFamily: 'Moonpig-Bold',
  },
  promoText: {
    color: INK,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Moonpig-Regular',
  },
  promoActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  secondaryActionText: {
    flex: 1,
    color: '#C22F50',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
    textAlign: 'center',
    paddingVertical: 12,
  },
  promoButton: {
    flex: 1,
    backgroundColor: '#0054c8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  recommendationsHeading: {
    color: INK,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'Moonpig-Bold',
    marginTop: 10,
  },
  recommendationRow: {
    flexDirection: 'row',
    gap: 10,
  },
  gift: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eef1f5',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    minHeight: 110,
    gap: 8,
  },
  giftThumb: {
    height: 62,
    width: '100%',
    backgroundColor: '#f0f1f3',
    borderRadius: 8,
  },
  giftName: {
    color: INK,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  plusCard: {
    backgroundColor: '#fffaf0',
    borderWidth: 1,
    borderColor: '#f3d88f',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
  },
  plusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  plusBadge: {
    backgroundColor: '#f8d75c',
    color: INK,
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    fontFamily: 'Moonpig-Bold',
  },
  plusPrice: {
    color: '#6b7486',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  plusTitle: {
    color: INK,
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  plusMeta: {
    color: '#737d8d',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  plusButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: BLUE,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 2,
  },
  plusButtonText: {
    color: BLUE,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  total: {
    gap: 8,
    paddingVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: INK,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ebedf1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  discountText: {
    color: INK,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  discountChevron: {
    color: GREY,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Moonpig-Regular',
  },
  primaryButton: {
    backgroundColor: BLUE,
    borderRadius: 10,
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 4,
  },
  primaryButtonDisabled: {
    backgroundColor: BLUE,
    opacity: 1,
  },
  primaryButtonMuted: {
    backgroundColor: '#b9c0cb',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  pressed: {
    opacity: 0.8,
  },
  infoCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#ebedf1',
    borderRadius: 12,
    padding: 18,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoCopy: {
    flex: 1,
    gap: 4,
  },
  infoIcon: {
    width: 32,
    height: 32,
  },
  infoTitle: {
    color: INK,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Moonpig-Bold',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  checkbox: {
    color: GREY,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#b9c0cb',
    borderRadius: 6,
    width: 21,
    height: 21,
    lineHeight: 21,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Moonpig-Bold',
    overflow: 'hidden',
  },
  checkboxChecked: {
    color: '#fff',
    backgroundColor: BLUE,
    borderColor: BLUE,
  },
  aboutActions: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 52,
    borderWidth: 2,
    borderColor: BLUE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 4,
  },
  secondaryButtonText: {
    color: BLUE,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  aboutContinue: {
    flex: 1,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardOption: {
    width: '47.5%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f1f3',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 12,
    position: 'relative',
  },
  cardOptionSelected: {
    borderColor: '#C22F50',
    borderWidth: 2,
  },
  circleCardImage: {
    width: '100%',
    aspectRatio: 166 / 220,
  },
  circleCardTitle: {
    color: INK,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
    paddingHorizontal: 10,
    paddingTop: 9,
  },
  cardSelectedBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#C22F50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelectedTick: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  fullWidthSecondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f0f1f3',
    borderRadius: 8,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  cardDisclaimer: {
    color: GREY,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Moonpig-Regular',
    marginTop: -4,
    },
    cardDisclaimerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
      marginTop: -4,
    },
    cardDisclaimerIcon: {
      width: 14,
      height: 14,
  },
  optionCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#e7ebf2',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selected: {
    borderColor: PINK,
    borderWidth: 2,
    backgroundColor: '#fff9fb',
  },
  optionCopy: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    color: INK,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  radio: {
    color: PINK,
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Moonpig-Regular',
  },
  radioEmpty: {
    color: '#acb5c4',
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Moonpig-Regular',
  },
  cardArt: {
    backgroundColor: '#f7d2df',
    height: 148,
    width: 112,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    overflow: 'hidden',
  },
  cardArtSmall: {
    height: 70,
    width: 52,
    borderRadius: 6,
  },
  cardArtAlt: {
    backgroundColor: '#f7e4a4',
  },
  cardArtLabel: {
    color: '#fff',
    fontSize: 8,
    letterSpacing: 0.8,
    fontFamily: 'Moonpig-Bold',
  },
  cardArtFlower: {
    color: '#ffffff',
    fontSize: 48,
    lineHeight: 48,
    fontFamily: 'Moonpig-Bold',
  },
  cardArtLine: {
    color: '#fff',
    fontSize: 9,
    lineHeight: 12,
    fontFamily: 'Moonpig-Bold',
  },
  label: {
    color: INK,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  messageStamp: {
    alignSelf: 'flex-start',
    backgroundColor: BLUE_SOFT,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageStampIcon: {
    width: 14,
    height: 14,
  },
  messageStampText: {
    color: BLUE,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recipientLabel: {
    flex: 1,
  },
  recipientIcon: {
    width: 16,
    height: 16,
  },
  messageBox: {
    minHeight: 152,
    borderWidth: 1,
    borderColor: '#d3d9e2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#fff',
    gap: 12,
  },
  messageText: {
    color: INK,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Moonpig-Regular',
  },
  messageTextInput: {
    flex: 1,
    minHeight: 96,
    color: INK,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Moonpig-Regular',
    padding: 0,
  },
  counter: {
    color: '#8a93a3',
    fontSize: 11,
    lineHeight: 14,
    textAlign: 'right',
    fontFamily: 'Moonpig-Regular',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageHint: {
    color: '#8a93a3',
    fontSize: 11,
    lineHeight: 14,
    fontFamily: 'Moonpig-Regular',
  },
  notice: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    gap: 10,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  disclaimerIcon: {
    width: 18,
    height: 18,
  },
  disclaimerCopy: {
    flex: 1,
    gap: 4,
  },
  noticeTitle: {
    color: INK,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationScreen: {
    flex: 1,
    backgroundColor: BACKGROUND,
    gap: 16,
    paddingBottom: 24,
  },
  confirmationBanner: {
    height: 56,
    backgroundColor: '#ffa6b6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmationBack: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationBackText: {
    color: BLUE,
    fontSize: 20,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationBackIcon: {
    width: 16,
    height: 16,
  },
  confirmationBannerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    lineHeight: 26,
    marginRight: 32,
    marginLeft: 12,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationCardImage: {
    width: 113,
    height: 141,
    alignSelf: 'center',
    borderRadius: 4,
  },
  confirmationSuccess: {
    alignSelf: 'center',
    backgroundColor: '#ebfdf5',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confirmationSuccessIcon: {
    width: 16,
    height: 16,
  },
  confirmationSuccessText: {
    color: '#10794f',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#f0f1f3',
  },
  confirmationInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  confirmationInfoIcon: {
    width: 24,
    height: 24,
  },
  confirmationInfoCopy: {
    flex: 1,
    gap: 2,
  },
  confirmationInfoTitle: {
    color: INK,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationInfoTitleMuted: {
    color: GREY,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  confirmationMessage: {
    marginHorizontal: 16,
    gap: 4,
  },
  confirmationMessageTitle: {
    color: INK,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
    textAlign: 'center',
  },
  confirmationMessageMuted: {
    textAlign: 'center',
  },
  confirmationFooterInfo: {
    backgroundColor: '#fff9eb',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 14,
    gap: 4,
  },
  confirmationFooterTitle: {
    color: '#8a661d',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  blockedNotice: {
    backgroundColor: '#fff8dc',
    borderRadius: 10,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#f2df88',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  blockedNoticeTitle: {
    color: '#8A661D',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  blockedNoticeText: {
    color: '#8A661D',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  matchPanel: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#c0467b',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  matchTitle: {
    alignSelf: 'stretch',
    color: PINK,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  matchHeadline: {
    color: INK,
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Moonpig-Bold',
  },
  checkList: {
    gap: 10,
    paddingHorizontal: 4,
  },
  listItem: {
    color: INK,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Moonpig-Regular',
  },
  resultCard: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 18,
    gap: 16,
    borderWidth: 1,
    borderColor: '#eceef2',
  },
  orderSummaryScreen: {
    backgroundColor: BACKGROUND,
    paddingBottom: 28,
  },
  orderSummaryBanner: {
    minHeight: 56,
    backgroundColor: '#ffa6b6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ffa6b6',
  },
  orderSummaryBannerIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderSummaryBannerIcon: {
    width: 16,
    height: 16,
  },
  orderSummaryBannerTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 26,
    marginLeft: 12,
    fontFamily: 'Moonpig-Bold',
  },
  orderSummaryContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 14,
    alignItems: 'center',
  },
  orderSummaryEyebrow: {
    color: BLUE,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontFamily: 'Moonpig-Bold',
  },
  orderSummaryTitle: {
    color: INK,
    fontSize: 26,
    lineHeight: 32,
    textAlign: 'center',
    fontFamily: 'Moonpig-Bold',
  },
  orderSummaryBody: {
    color: GREY,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Moonpig-Regular',
  },
  senderRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
    gap: 8,
  },
  senderText: {
    color: INK,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Moonpig-Bold',
  },
  senderIcon: {
    width: 16,
    height: 16,
  },
  circleLabel: {
    backgroundColor: '#f9c406',
    color: INK,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 7,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Moonpig-Bold',
  },
  orderSummaryCardImage: {
    width: 202,
    height: 253,
    borderRadius: 4,
    marginVertical: 4,
  },
  messageSummaryBox: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 18,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  messageSummaryText: {
    color: INK,
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'CaveatBrush-Regular',
  },
  messageSummaryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f1f3',
  },
  messageSummaryFooterText: {
    color: GREY,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
  },
  messageSummaryBadge: {
    width: 14,
    height: 14,
  },
  orderSummaryDisclaimer: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  orderSummaryDisclaimerText: {
    flex: 1,
    color: GREY,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Moonpig-Regular',
  },
  anonymousReplyButton: {
    alignSelf: 'stretch',
    minHeight: 52,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: BLUE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  anonymousReplyButtonText: {
    color: BLUE,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  resultActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingTop: 2,
  },
  resultActionText: {
    color: GREY,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Moonpig-Regular',
    textDecorationLine: 'underline',
  },
  resultActionDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#b8b8b8',
  },
  orderSummaryPrivacy: {
    backgroundColor: '#ebfdf5',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderSummaryPrivacyIcon: {
    width: 14,
    height: 14,
  },
  orderSummaryPrivacyText: {
    color: '#10794f',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
  },
  orderSummaryInfoCard: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: '#f0f1f3',
  },
  orderSummaryInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  orderSummaryInfoIcon: {
    width: 16,
    height: 16,
    marginTop: 2,
  },
  orderSummaryInfoCopy: {
    flex: 1,
    gap: 4,
  },
  orderSummaryInfoTitle: {
    color: INK,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Moonpig-Bold',
  },
  resultTag: {
    color: PINK,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Moonpig-Bold',
    letterSpacing: 1,
  },
  resultTitle: {
    color: INK,
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Moonpig-Bold',
    letterSpacing: -0.4,
  },
  resultHeart: {
    color: PINK,
    fontSize: 40,
    lineHeight: 40,
    textAlign: 'right',
    fontFamily: 'Moonpig-Regular',
  },
});
