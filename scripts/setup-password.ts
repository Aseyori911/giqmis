import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function setupPassword() {
  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    console.error('❌ ADMIN_PASSWORD not found in environment variables')
    process.exit(1)
  }

  const password_hash = await bcrypt.hash(password, 12)

  const { error } = await supabase
    .from('admin_credentials')
    .insert({ password_hash })

  if (error) {
    console.error('❌ Failed to save password:', error.message)
    process.exit(1)
  }

  console.log('✅ Password saved successfully to Supabase!')
}

setupPassword()