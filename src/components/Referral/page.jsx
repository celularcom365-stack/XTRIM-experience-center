import ReferralItem from "../ReferralSon/ReferralItem"

function Referral({ referrals }) {
  if (!Array.isArray(referrals) || referrals.length === 0) {
    return <div className="p-10">No tienes referidos aún</div>
  }

  return (
    <div className="space-y-4">
      {referrals.map(ref => (
        <ReferralItem key={ref.id} referral={ref} />
      ))}
    </div>
  )
}

export default Referral
