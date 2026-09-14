const UPGS = {
    st: {
        res: "Spacetime",
        id: "st",
        canBuy(x) {
            return player.spacetime.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.spacetime = player.spacetime.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Start to generate spacetime each time.`,
                cost: E(0),
            },{
                desc: `Spacetime boost its gain.`,
                cost: E(15),
                effect() {
                    let x = player.spacetime.add(1).root(4).softcap(1e5,0.5,0)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Gain 20x more Spacetime.`,
                cost: E(300),
            },{
                unl() { return player.story >= 1 },
                desc: `Spacetime adds to Inflation growth's base.`,
                cost: E(1e5),
                effect() {
                    let x = player.spacetime.add(1).log10().pow(0.75).div(2)
                    return x
                },
                effDesc(x) { return "+"+format(x)+"x" },
            },{
                unl() { return player.story >= 1 },
                desc: `Inflation adds its base at a reduced rate. The inflation effect is raised by 2`,
                cost: E(1e6),
                effect() {
                    let x = player.inflation.add(1).log10().pow(2/3).div(20)
                    return x
                },
                effDesc(x) { return "+"+format(x)+"x" },
            },{
                unl() { return player.story >= 1 },
                desc: `Universe time formula is multiplied by spacetime.`,
                cost: E(1e8),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(2)
                    if (hasUpg("at",6)) x = x.pow(60)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 2 && player.susy.times > 1 },
                desc: `Raise Inflation's effect based on Slepton.`,
                cost: E(1e11),
                effect() {
                    let x = player.susy.powers[1].add(1).log10().add(1).root(6)
                    if (hasUpg("ft",4)) x = x.pow(2)
                    return x//.softcap(4,0.5,0)
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 2 && player.susy.times > 2 },
                desc: `Universe time boost Supersymmetry particles gain.`,
                cost: E(1e16),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).log10().root(1.5)
                    if (hasUpg("at",6)) x = x.pow(3777)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=3 },
                desc: `The fabric of time gain's exponent is increased by 2.`,
                cost: E(1e60),
            },{
                unl() { return hasUpg("st",9) },
                desc: `haha you found a secret before quark version<br><img src="images/hidden1.png">`,
                cost: E(1/0),
            },{
                unl() { return player.story >= 4 },
                desc: `Gain more quarks based on spacetime.`,
                cost: E('e8100'),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(0.8)
                    if (hasUpg("st",17)) x = x.mul(tmp.upgs_eff.st[17])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on spacetime.`,
                cost: E('e37000'),
                effect() {
                    let x = player.spacetime.add(1).log10().add(1).pow(0.75)
                    if (hasUpg("st",17)) x = x.mul(tmp.upgs_eff.st[17])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=6 },
                desc: `Neutrons are 10% stronger.`,
                cost: E('e111111'),
            },{
                unl() { return player.story>=7 },
                desc: `Proton are 40% stronger.`,
                cost: E('e150000'),
            },{
                unl() { return player.story>=7 },
                desc: `Proton Better Stronger based on spacetime.`,
                cost: E('e210000'),
                effect() {
                    let x = player.spacetime.add(1).log10().log10().sub(3.75)
                    if (hasUpg("qu",11)) x = x.mul(tmp.upgs_eff.qu[11])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=7 },
                desc: `Better Spacetime Gain based on Universe Time.`,
                cost: E('e490000'),
                effect() {
                    let x = player.uniTime.add(1).pow(512)
                    if (hasUpg("ft",17)) x = x.pow(tmp.upgs_eff.ft[17])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=7 },
                desc: `Proton Better Stronger based on supersymmetry particles.`,
                cost: E('e775000'),
                effect() {
                    let x = player.susy.particles.add(1).log10().log10().sub(3.75).pow(6.25)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story>=8 },
                desc: `Spacetime Upgrade 10 & 11 based on spacetime.`,
                cost: E('e1.5e6'),
                effect() {
                    let x = player.spacetime.add(1).log10().log(2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return hasUpg("at",12) },
                desc: `Quarks Upgrade 5 Stronger based on the fabric of time.`,
                cost: E('e1.79e6'),
                effect() {
                    let x = player.fabricTime.add(1).pow(0.1).root(2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },
        ],
    },
    inf: {
        res: "Inflation",
        id: "inf",
        canBuy(x) {
            return player.inflation.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.inflation = player.inflation.div(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                unl() { return player.susy.times > 1 },
                desc: `Universe time boost spacetime gain at a reduced rate.`,
                cost: E("e3600"),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).log10().add(1).pow(1.25)
                    if (hasUpg("at",6)) x = x.pow(3333)
                    if (hasUpg("inf",15)) x = x.pow(tmp.upgs_eff.inf[15])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.susy.times > 1 },
                desc: `Keep ^0.5 of Inflation gained on reset.`,
                cost: E("e7200"),
            },{
                unl() { return player.susy.times > 1 },
                desc: `Universe time's formula softcap is weaker based on Inflation.`,
                cost: E("e1e7"),
                effect() {
                    let x = E(0.9).pow(player.inflation.log10().add(1).log10().root(2)).max(0.1).toNumber();
                    return x
                },
                effDesc(x) { return format((1-x)*100)+"% weaker" },
            },{
                unl() { return player.story>=3 },
                desc: `Inflation boost the fabric of time gain.`,
                cost: E("ee16"),
                effect() {
                    let x = player.inflation.log10().add(1).root(4)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 6 },
                desc: `Protons are 25% stronger.`,
                cost: E("ee460"),
            },{
                unl() { return player.story >= 7 },
                desc: `Gain more atoms based on Universe Time [Only 1e16 Seconds].`,
                cost: E("ee560"),
                effect() {
                    let x = player.uniTime.div(1e16)
                    if (hasUpg("inf",14)) x = x.mul(tmp.upgs_eff.inf[14])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Universe Time Better Formula on Rewards.`,
                cost: E("ee1186"),
                effect() {
                    let x = E(1000).add(player.rewards.add(1)).div(1000)
                    if (hasUpg("inf",13)) x = x.mul(tmp.upgs_eff.inf[13])
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 7 },
                desc: `Universe time's formula softcap is weaker based on Quarks.`,
                cost: E("ee1237"),
                effect() {
                    let x = E(0.9).pow(player.quarks.log10().add(1).log10().root(1.75)).max(0.25).toNumber();
                    return x
                },
                effDesc(x) { return format((1-x)*100)+"% weaker" },
            },{
                unl() { return player.story >= 7 },
                desc: `Fabric Time Upgrade 3 is Stronger x1.02.`,
                cost: E("ee1500"),
            },{
                unl() { return player.story >= 7 },
                desc: `Reward's requirement is cheaper By ^1.04.`,
                cost: E("ee1570"),
            },{
                unl() { return player.story >= 7 },
                desc: `Gain Much More Atom based on Supersymmetry Particles / Max Formula: ^1.05.`,
                cost: E("ee1722"),
                effect() {
                    let x = player.susy.particles.add(1).log('e4.3e5').softcap(1.05,0,0)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 7 },
                desc: `Gain x75 More Atoms.`,
                cost: E("ee1950"),
            },{
                unl() { return player.story >= 8 },
                desc: `Speed inflation growth Better Formula Based on Rewards.`,
                cost: E("ee1987"),
                effect() {
                    let x = E(10000).add(player.rewards.add(1)).div(10000)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 8 },
                desc: `Inflation Upgrade 7 Formula Based on Atoms.`,
                cost: E("ee3000"),
                effect() {
                    let x = player.atoms.add(1).log10().log(9).sub(0.825)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 8 },
                desc: `Inflation Upgrade 6 Stronger Formula Based on Inflation.`,
                cost: E("3.333ee3333"),
                effect() {
                    let x = player.inflation.add(1).log(1e100).log10()
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 8 },
                desc: `Inflation Upgrade 1 Better Formula Based on Atom.`,
                cost: E("ee3685"),
                effect() {
                    let x = player.atoms.add(1).root(128)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },
        ],
    },
    ft: {
        res: "Fabric of time",
        id: "ft",
        canBuy(x) {
            return player.fabricTime.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.fabricTime = player.fabricTime.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more spacetime based on the fabric of time.`,
                cost: E(50),
                effect() {
                    let x = player.fabricTime.add(1).pow(0.75)
                    if (hasUpg("at",6)) x = x.pow(15)
                    if (hasUpg("ft",14)) x = x.pow(tmp.upgs_eff.ft[14])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Gain more fabric of time based on supersymmetry particles.`,
                cost: E(100),
                effect() {
                    let x = player.susy.particles.add(1).log10().add(1).pow(1.5)
                    if (hasUpg("at",6)) x = x.pow(3.5)
                    if (hasUpg("ft",15)) x = x.pow(tmp.upgs_eff.ft[15])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Supersymmetry's effect exponent is increased based on the fabric of time.`,
                cost: E(1000),
                effect() {
                    let x = player.fabricTime.add(1).log10().root(3)
                    if (hasUpg("inf",8)) x = x.mul(1.02)
                    return x
                },
                effDesc(x) { return "^2 → ^"+format(x.add(2)) },
            },{
                desc: `Gain 10% of Supersymmetry particles gained on reset.`,
                cost: E(10000),
            },{
                desc: `Spacetime Upgrade 7 is twice as effective.`,
                cost: E(1e6),
            },{
                desc: `Raise Spacetime & Supersymmetry particles gains to the 1.1th power.`,
                cost: E(1e11),
            },{
                unl() { return player.story >= 4 },
                desc: `Reward's requirement is cheaper based on the fabric of time.`,
                cost: E(1e38),
                effect() {
                    let x = E(1.01).pow(player.fabricTime.add(1).log10().root(2))
                    return x
                },
                effDesc(x) { return format(x)+"x cheaper" },
            },{
                unl() { return player.story >= 4 },
                desc: `Raise Quarks gain to the 1.025th power.`,
                cost: E(1e100),
            },{
                unl() { return player.story >= 7 },
                desc: `Gain 1e1000% of Supersymmetry particles gained on reset.`,
                cost: E(1e242),
            },{
                unl() { return player.story >= 7 },
                desc: `Universe Time Better Formula on the fabric of time.`,
                cost: E("e465"),
                effect() {
                    let x = player.fabricTime.add(1).pow(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Raise Atoms gain to the 1.05th power.`,
                cost: E('e515'),
            },{
                unl() { return player.story >= 7 },
                desc: `Atoms Upgrade 1 Is Stronger Formula on the fabric of time.`,
                cost: E("3.595e616"),
                effect() {
                    let x = player.fabricTime.add(1).log10().pow(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Spacetime gain to the e50,000 Multiplier.`,
                cost: E('2e625'),
            },{
                unl() { return player.story >= 7 },
                desc: `Supersymmetry particles gain to the e20,000 Multiplier.`,
                cost: E('2e685'),
            },{
                unl() { return player.story >= 8 },
                desc: `Fabric Time Upgrade 1 Is Stronger Formula on the fabric of time.`,
                cost: E("3.88e808"),
                effect() {
                    let x = player.fabricTime.add(1).log10().log(4)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 8 },
                desc: `Fabric Time Upgrade 2 Is Stronger Formula on Quarks.`,
                cost: E("e1066"),
                effect() {
                    let x = player.quarks.add(1).log10().log(8)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 8 },
                desc: `Spacetime Gain Softcap^2 is 2.5% Weaker.`,
                cost: E('e1270'),
            },{
                unl() { return player.story >= 8 },
                desc: `Spacetime Upgrade 15 Is Better Formula on Universe Time.`,
                cost: E("e1285"),
                effect() {
                    let x = player.uniTime.add(1).pow(0.25).log(8)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },
        ],
    },
    qu: {
        res: "Quarks",
        id: "qu",
        canBuy(x) {
            return player.quarks.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.quarks = player.quarks.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more quarks based on Inflation.`,
                cost: E(300),
                effect() {
                    let x = player.inflation.add(1).log10().add(1).log10().add(1)
                    if (hasUpg("at",6)) x = x.pow(2.25)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Triple quarks gain for each upgrade bought.`,
                cost: E(5e4),
                effect() {
                    let x = E(3).pow(player.upgs.qu.length)
                    return x
                },
            },{
                desc: `Gain more quarks based on supersymmetry particles.`,
                cost: E(2.5e7),
                effect() {
                    let x = player.susy.particles.add(1).log10().add(1)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Raise inflation's exponent to the 1.1th power.`,
                cost: E(1e18),
            },{
                desc: `Speed inflation growth based on rewards.`,
                cost: E(1e38),
                effect() {
                    let x = E(1.25).pow(player.rewards)
                    if (hasUpg("st",18)) x = x.mul(tmp.upgs_eff.st[18])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on Universe Time.`,
                cost: E(1e54),
                effect() {
                    let x = player.uniTime.mul(1e44).add(1).root(15)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 5 },
                desc: `Gain more atoms based on quarks.`,
                cost: E(1e100),
                effect() {
                    let x = player.quarks.add(1).log10().add(1).pow(2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Gain Better Supersymmetry based on quarks / But You Raise spacetime's exponent to the 0.9th power.`,
                cost: E(1e168),
                effect() {
                    let x = player.quarks.add(1).add(1).pow(100)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Gain more quarks based on atom.`,
                cost: E(2e236),
                effect() {
                    let x = player.atoms.add(1).log10().add(1).pow(5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Proton Better Stronger based on quarks.`,
                cost: E(1e262),
                effect() {
                    let x = player.quarks.add(1).log10()
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 8 },
                desc: `Raise Supersymmetry Particles exponent to the 1.25th power / But You Raise universe time exponent to the 0.72th power.`,
                cost: E(5e277),
            },{
                unl() { return player.story >= 8 },
                desc: `Spacetime Upgrade 14 Stronger based on quarks.`,
                cost: E(2e282),
                effect() {
                    let x = player.quarks.add(1).log10().root(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 8 },
                desc: `Gain More Quarks based on quarks.`,
                cost: E(3e297),
                effect() {
                    let x = player.quarks.add(1).log10().root(1.25).pow(1.5)
                    return x
                },
                effDesc(x) { return format(x)+"x" },

            },
        ],
    },
    at: {
        res: "Atoms",
        id: "at",
        canBuy(x) {
            return player.atoms.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.atoms = player.atoms.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [
            {
                desc: `Gain more quarks based on atoms.`,
                cost: E(3e4),
                effect() {
                    let x = player.atoms.add(1).root(3)
                    if (hasUpg("ft",11)) x = x.mul(tmp.upgs_eff.ft[11])
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                desc: `Spacetime gain softcap is weaker based on atoms.`,
                cost: E(2e8),
                effect() {
                    let x = E(0.9).pow(player.atoms.add(1).log10().root(2))
                    return x.toNumber()
                },
                effDesc(x) { return format((1-x)*100)+"% weaker" },
            },{
                desc: `Raise the fabric of time to the 1.1th power.`,
                cost: E(1e13),
            },{
                unl() { return player.story >= 6 },
                desc: `Electrons are 2.5% stronger.`,
                cost: E(1e19),
            },{
                unl() { return player.story >= 7 },
                desc: `Universe time Better formula is multiplied by Atom.`,
                cost: E(1e22),
                effect() {
                    let x = player.atoms.add(1).log10().div(20)
                    return x
                },
                effDesc(x) { return "^"+format(x) },
            },{
                unl() { return player.story >= 7 },
                desc: `Reward's requirement is cheaper By x1.2.`,
                cost: E(1e29),
            },{
                unl() { return player.story >= 7 },
                desc: `St Upgrade 6 & 8 And inf Upgrade 1 And ft Upgrade 1 & 2 And Quarks Upgrade 1 is Now Better.`,
                cost: E(4e32),
            },{
                unl() { return player.story >= 7 },
                desc: `Reward's requirement is cheaper based on Atom.`,
                cost: E(1e33),
                effect() {
                    let x = player.atoms.add(1).log10().log10().log(1.48)
                    return x
                },
                effDesc(x) { return format(x)+"x cheaper" },
            },{
                unl() { return player.story >= 7 },
                desc: `Universe Time Better Formula^2 based on Atom.`,
                cost: E(1e37),
                effect() {
                    let x = player.atoms.add(1).pow(15555)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },{
                unl() { return player.story >= 7 },
                desc: `Gain 30x more Atoms.`,
                cost: E(5e40),
            },{
                unl() { return player.story >= 7 },
                desc: `Gain 100x more Atoms.`,
                cost: E(1e43),
            },{
                unl() { return player.story >= 7 },
                desc: `Gain 1e12x more Quarks And Wait To Reach Kilo-Universe Years Era = Now Unlock More Upgrades^2.`,
                cost: E(1e50),
            },{
                unl() { return player.story >= 8 },
                desc: `Unlock More Upgrade For Spacetime.`,
                cost: E(1e60),
            },{
                unl() { return player.story >= 8 },
                desc: `Electron Are Stronger based on Atom.`,
                cost: E(2e66),
                effect() {
                    let x = player.atoms.add(1).log(1.2)
                    return x
                },
                effDesc(x) { return format(x)+"x" },
            },
        ],
    },
    /*
    inf: {
        res: "Inflation",
        id: "inf",
        canBuy(x) {
            return player.inflation.gte(this.ctn[x].cost)
        },
        buy(x) {
            if (this.canBuy(x) && !player.upgs[this.id].includes(x)) {
                player.inflation = player.inflation.sub(this.ctn[x].cost)
                player.upgs[this.id].push(x)
            }
        },
        ctn: [

        ],
    },
    /*
    {
        desc: `Placeholder.`,
        cost: E(1/0),
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
}

function hasUpg(x,c) { return player.upgs[x].includes(c) }

function updateUpgsHTML(x) {
    let us = UPGS[x]
    for (let c = 0; c < us.ctn.length; c++) {
        let u = us.ctn[c]
        let unl = u.unl?u.unl():true
        let id = `upg_${x}_${c}`

        tmp.el[id+"_div"].setDisplay(unl)
        if (unl) {
            tmp.el[id+"_div"].setClasses({upg_btn: true, locked: !us.canBuy(c) && !player.upgs[x].includes(c), bought: player.upgs[x].includes(c)})
            tmp.el[id+"_cost"].setTxt(format(u.cost,0))
            if (u.effDesc) tmp.el[id+"_eff"].setHTML(u.effDesc(tmp.upgs_eff[x][c]))
        }
    }
}

el.update.upgs = _=>{
    if (tmp.tab == 0) {
        if (tmp.stab[0] == 0) updateUpgsHTML("st")
        if (tmp.stab[0] == 1) updateUpgsHTML("inf")
        if (tmp.stab[0] == 2) updateUpgsHTML("ft")
    }
    if (tmp.tab == 2) {
        if (tmp.stab[2] == 1) updateUpgsHTML("qu")
        if (tmp.stab[2] == 2) updateUpgsHTML("at")
    }
}

el.setup.upgs = _=>{
    for (let x in UPGS) {
        let table = new Element('upgs_'+x+"_table")
        if (table.el) {
            let us = UPGS[x]
            let inner = ""
            for (let c = 0; c < us.ctn.length; c++) {
                let u = us.ctn[c]
                let id = `upg_${x}_${c}`
                inner += `
                <button class="upg_btn" id="${id}_div" onclick="UPGS.${x}.buy(${c})">
                    ${u.desc}<br>
                    ${u.effDesc?`Currently: <span id="${id}_eff">???</span><br>`:""}
                    Cost: <span id="${id}_cost">???</span> ${us.res}
                </button>
                `
            }
            table.setHTML(inner)
        }
    }
}

tmp_update.push(_=>{
    for (let x in UPGS) {
        let us = UPGS[x]
        for (let c = 0; c < us.ctn.length; c++) {
            let u = us.ctn[c]
            if (u.effect) tmp.upgs_eff[x][c] = u.effect()
        }
    }
})